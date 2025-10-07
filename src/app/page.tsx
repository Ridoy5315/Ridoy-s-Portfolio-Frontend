import { Button } from "@/components/ui/button";
import { fontBody } from "./layout";

const HomePage = () => {
  return (
    <div>
      <h1 className={fontBody.className}>Hello Next Js</h1>
      <Button>Hello</Button>
    </div>
  );
};

export default HomePage;