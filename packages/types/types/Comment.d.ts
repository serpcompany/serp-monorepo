export type Comment = {
  id: string;
  email: string;
  name: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parent_id?: string | null;
  replies: Comment[];
};
