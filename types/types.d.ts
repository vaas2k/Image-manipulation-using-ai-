interface CreateUser {
  _id ?: string | undefined,
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
  title: string | undefined | null;
  type: string | undefined | null;
  width: number | undefined | null;
  height: number | undefined | null;
  aspect_ratio?: string | undefined | null;
  config?: object | undefined | null;
  color?: string | undefined | null;
  object_recolor: string | undefined | null;
  Prompt?: string | undefined | null;
  transformation_url: string | undefined | null;
  author: string | undefined | null ;
  author_img: string | undefined | null;
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
  plan: string ;
  credits: number;
  amount: number;
  buyerId: any;
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
