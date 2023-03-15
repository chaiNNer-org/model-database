import tagCategories from '../../data/tag-categories.json';
import tags from '../../data/tags.json';
import users from '../../data/users.json';
import { Tag, TagCategory, TagCategoryId, TagId, User, UserId } from './schema';

export const STATIC_TAG_DATA: ReadonlyMap<TagId, Tag> = new Map(Object.entries(tags) as [TagId, Tag][]);

export const STATIC_TAG_CATEGORY_DATA: ReadonlyMap<TagCategoryId, TagCategory> = new Map(
    Object.entries(tagCategories) as [TagCategoryId, TagCategory][]
);

export const STATIC_USER_DATA: ReadonlyMap<UserId, User> = new Map(Object.entries(users) as [UserId, User][]);
