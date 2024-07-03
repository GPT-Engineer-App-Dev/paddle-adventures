import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Welcome to Kayak Trip Planner</h1>
      <p className="mb-4">Plan your perfect kayak trip starting from Sollenkroka.</p>
      <Link to="/map">
        <Button variant="primary">Go to Map</Button>
      </Link>
    </div>
  );
};

export default Index;
