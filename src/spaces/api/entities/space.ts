interface Space {
  id: number;
  title: string;
  description: string;
  users: {
    id: number;
    admin: boolean;
    name: string;
  }[];
}

export default Space;
