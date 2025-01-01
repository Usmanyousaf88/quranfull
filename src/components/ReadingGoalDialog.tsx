import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { useUpdateProgress } from "@/services/progressApi";
import { toast } from "sonner";

interface ReadingGoalDialogProps {
  currentGoal: number;
}

const ReadingGoalDialog: React.FC<ReadingGoalDialogProps> = ({ currentGoal }) => {
  const [open, setOpen] = React.useState(false);
  const [goal, setGoal] = React.useState(currentGoal);
  const { mutate: updateProgress } = useUpdateProgress();

  const handleSave = () => {
    updateProgress(
      { dailyGoal: goal },
      {
        onSuccess: () => {
          toast.success("Reading goal updated", {
            description: `Your daily goal is now set to ${goal} pages`,
          });
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Daily Reading Goal</DialogTitle>
          <DialogDescription>
            Set your daily Quran reading goal in pages. This helps you maintain a
            consistent reading habit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              min={1}
              max={30}
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReadingGoalDialog;