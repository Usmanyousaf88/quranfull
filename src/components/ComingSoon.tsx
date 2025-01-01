import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "This feature will be available in the next update.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <Construction className="w-16 h-16 mx-auto text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-8">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;