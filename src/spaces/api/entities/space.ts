interface Space {
  id: number;
  title: string;
  description: string;
  users: {
    id: number;
    admin: boolean;
  }[];
}

export default Space;
