interface CreateUser {
  clerkId: string | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  plan?: number | null | undefined;
  photo?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  credits: number | null;
}

interface UpdateUser {
  clerkId?: string | number;
  username?: string;
  email?: string;
  credits?: number | null;
  firstName: string;
  lastName: string;
  photo: string;
}

interface Form {
  userId?: string | number;
  username?: string;
  prompt?: string;
  credits?: number;
}

interface imageVal {
  image: any;
  title: string;
  type: string;
  width: number;
  height: number;
  aspect_ratio?: string;
  config?: object;
  color?: string;
  object_recolor: string;
  Prompt?: string;
  transformation_url: string;
  author: string;
  author_img: string;
}

interface TransformationImage {
  image?: any;
  title?: string;
  type?: string;
  hasDownload?: boolean;
  isTransforming?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CheckoutTransactionParams  {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

interface CreateTransactionParams  {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

export { CreateUser, UpdateUser, imageVal, TransformationImage,CheckoutTransactionParams,CreateTransactionParams };
