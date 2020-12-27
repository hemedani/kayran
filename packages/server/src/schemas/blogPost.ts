import { RUser, User, userSelectable } from "./user.ts";
import { Bson } from "https://deno.land/x/mongo@v0.20.0/deps.ts";
import db from "../../db.ts";
import { BlogCategory, blogCategorySelectable, RBlogCategory } from "./blogCategory.ts";
import { Base } from "./utils/bases/base.ts";
import { BlogTag, blogTagSelectable, RBlogTag } from "./blogTag.ts";
import db from "../../db.ts";
import { fieldType } from "./utils/index.ts";
import { RType } from "./utils/rType.ts";
import { baseSelectableFields, RBase } from "./utils/bases/index.ts";
export interface BlogPost extends Base {
	title: string;
	summary: string;
	content: string;
	photo?: string;
	author: User;
	blogCategories: BlogCategory[];
	replierBlogCommentRefs: Bson.ObjectId[] /*the id of the comments of this post */;
	blogTags?: BlogTag[];
	likeUsers?: Bson.ObjectID[];
	totalLikes?: number=0; /*an array of users who liked the post */;
	blogCommentRefs?: Bson.ObjectID[];
	promotion?: number = 0;
	totalViews?: number = 0;
}
export interface RBlogPost extends RBase {
  tittle?: RType;
  summary?: RType;
  content?: RType;
  photo?: RType;
  author?: RUser;
  blogTags?: RBlogTag;
  likeUsers?: RUser;
  blogCategories?: RBlogCategory;
  totalLikes?: RType;
  promotion?: RType;
  totalViews?: RType;
  blogCommentRefs?: Bson.ObjectID[];
}

/**
 * represent releation of city schema
 * @param depth
 */
export const blogPostSelectable = (depth: number = 4): any => {
  depth--;
  const returnObj = {
    ...baseSelectableFields(),
    tittle: fieldType,
    summary: fieldType,
    content: fieldType,
    photo: fieldType,
    totalLikes: fieldType,
    promotion: fieldType,
    totalViews: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        blogTags: {
          type: "object",
          optional: true,
          props: blogTagSelectable(depth),
        },
        blogCategories: {
          type: "object",
          optional: true,
          props: blogCategorySelectable(depth),
        },
        author: {
          type: "object",
          optional: true,
          props: userSelectable(depth),
        },
        likeUsers: {
          type: "object",
          optional: true,
          props: userSelectable(depth),
        },
      }
    : returnObj;
};

export const blogPosts = db.collection<BlogPost>("blogPosts");
