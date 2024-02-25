import Blog from "../models/blog.js";
import Profile from "../models/profile.js";
import Tag from "../models/tag.js";
import Comment from "../models/comments.js";
// import Like from "../models/like.js";
import { Op, literal } from "sequelize";
import sequelize from "../models/connection.js";
import Major from "../models/major.js";

export const createBlog = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Blog info not inputted" });
  }
  try {

    req.body.ProfileId = req.user.profileId;
    const newBlog = await Blog.create(req.body);
    res
      .status(200)
      .json({ message: "blog created with the userId of " + req.user.id , id: newBlog.id});
  } catch (err) {
    next(err);
  }
};

export const findBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const findBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOne({
      where: { id: id },
      attributes: [
        [literal('(SELECT COUNT(*) FROM Likes WHERE BlogId = Blog.id)'), 'likeCount'],
        [literal(`(SELECT COUNT(*) FROM Likes WHERE BlogId = Blog.id AND ProfileId = ${req.user.profileId})`), 'hasLiked'],
        'id',
        'name',
        'blog',
        'description',
        'createdAt',
        'updatedAt',
        'imgUrl'
      ],
      include: [
        {
          model: Profile,
        },
        {
          model: Comment,
          include: [{ model: Profile }],

        },
        {model: Tag}
      ],
    });


    let message;
    blog ? (message = null) : (message = "Blog not found with this id: " + id);
    return res
      .status(200)
      .json({
        blog: blog,
        isSameUser: req.user.isAdmin || blog.Profile.id == req.user.profileId,
      });
  } catch (err) {
    next(err);
  }
};


export const updateBlog = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "No data sent!" });
  }
  try {
    const blog = await Blog.findOne({where: {id: req.params.id}
    , include: [{model: Profile, attributes: ['id']}]});
    console.log(blog.Profile.id)
    if (req.user.isAdmin || req.user.profileId == blog.Profile.id) {
      await blog.update(req.body);
      return res.status(200).json({ message: "Blog Updated" });
    } else {
      return res
        .status(403)
        .json({ message: "user isn't allowed to update this post" });
    }
  } catch (err) {
    next(err);
  }
};

export const getBlogTags = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    // Fetch tags and their association with the given blog ID in a single query
    const tags = await Tag.findAll({
      include: [
        {
          model: Blog,
          where: { id: blogId },
          attributes: ['id'],
          
          required: false, // Use left join to include tags even if they are not associated with the blog
  
        },
      ]
  });
  

    res.status(200).json(tags);
  }catch (err) {
    
    next(err);
  }
}

export const updateBlogTags = async (req, res, next) => {
  
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
      include: 
      [
        { model: Tag },
        {model: Profile, attributes: ['id']} 
      
      ]
    });
    
    if (blog.Profile.id != req.user.profileId) {
        return res.status(403).json({ message: "Blog doesn't belong to the user." });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    // Check user authorization here...

    const { add, remove } = req.body;

    // Remove associations based on 'remove' array
    if (remove && remove.length > 0) {
      await sequelize.models.BlogsTags.destroy({
        where: {
          BlogId: req.params.id,
          TagId: remove
        }
      });
    }

    // Add associations
    if (add && add.length > 0) {
      await sequelize.models.BlogsTags.bulkCreate(
        add.map(tagId => ({
          BlogId: req.params.id,
          TagId: tagId
        })),
        { ignoreDuplicates: true } // Ignore duplicate associations
      );
    }

    return res.status(200).json({ message: "Tags updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};



export const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!(req.user.profileId == id || req.user.isAdmin)) {
      return res
        .status(403)
        .json({ message: "you're not allowed to delete this post" });
    } else {
      let blog = await Blog.findOne({ where: { id: id } }).then((result) => {
        res
        .status(200)
        .json({ message: "Blog deleted", blog: result.imgUrl });
        result.destroy();
        return;
      });
    }
  } catch (err) {
    next(err);
  }
};

// specific requests

export const findBlogsByProfile = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blogs = await Blog.findAll({ where: { ProfileId: id } });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const findBlogsByUser = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({ where: { UserId: req.user.id } });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const findBlogsByTag = async (req, res, next) => {
  const tag = req.params.tag;
  try {
    const blogs = await Blog.findAll({ where: { tag: tag } });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const findBlogsByDate = async (req, res, next) => {
  const date = req.params.date;
  try {
    const blogs = await Blog.findAll({ where: { date: date } });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const findBlogsBetweenDates = async (req, res, next) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  try {
    const blogs = await Blog.findAll({
      where: { date: { [Op.between]: [startDate, endDate] } },
    });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};
export const findBlogsBySearch = async (req, res, next) => {
  const search = req.body;
  const whereSearch = {};
  const whereSearchIncludeTags = {};
  if (search.name) {
    whereSearch.name = { [Op.like]: `%${search.name}%` };
  }
  if (search.date) {
    if (search.date.length == 2) {
      const startDate = new Date(search.date[0]);
      const endDate = new Date(search.date[1]);
      whereSearch.createdAt = { [Op.between]: [startDate, endDate] };
    } else if (search.date.length == 1) {
      const startDate = new Date(search.date[0]);
      const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      whereSearch.createdAt = { [Op.between]: [startDate, endDate] };
    }
  }
  if (search.tags.length > 0) {
    whereSearchIncludeTags.id = { [Op.in]: search.tags };
  }
  try {
    const blogs = await Blog.findAll({
      where: whereSearch,
      include: whereSearchIncludeTags
        ? [
          {
            model: Tag,
            where: whereSearchIncludeTags,
          },
        ]
        : [],
    });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const findBlogsByCategory = async (req, res, next) => {
  console.log(req.user)
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: Tag,
          where: { id: { [Op.in]: [1, 2, 3] } },
          attributes: ["name"],
        },
        {
          model: Profile,
          attributes: ["full_name"],
          include: [{
            model: Major,
            where: {id: 1},
            required: false
          }]
        },
       
      ],
    });

    return res.status(200).json(blogs);
  } catch (err) {
    return next(err);
  }
};
