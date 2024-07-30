import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { DraggableTaskProp } from "@/types/TaskTypes";
import { MdDragIndicator } from "react-icons/md";

const DraggableTask: React.FC<DraggableTaskProp> = ({ task, handleOk }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="relative cursor-default"
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      }}
      {...attributes}
    >
      <TaskCard data={task} handleOk={handleOk} />
      <span className="absolute top-3 right-3 cursor-pointer" {...listeners}>
        <MdDragIndicator />
      </span>
    </div>
  );
};

export default DraggableTask;
