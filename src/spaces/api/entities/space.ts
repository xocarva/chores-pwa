interface Space {
  id: number;
  title: string;
  description: string;
  users: {
    id: number;
    name: string;
  }[];
}

export default Space;
