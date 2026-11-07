
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type Task = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  priority: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React Native assignment',
    description: '',
    time: '10:00 AM',
    category: 'Study',
    priority: 'High',
    completed: false,
  },
  {
    id: '2',
    title: 'Review project requirements',
    description: '',
    time: '12:30 PM',
    category: 'Work',
    priority: 'Medium',
    completed: true,
  },
  {
    id: '3',
    title: 'Read programming notes',
    description: '',
    time: '04:00 PM',
    category: 'Study',
    priority: 'Low',
    completed: false,
  },
];

type NewTask = Omit<Task, 'id' | 'completed'>;

type TaskContextType = {
  tasks: Task[];
  addTask: (task: NewTask) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updatedTask: NewTask) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function addTask(task: NewTask) {
    setTasks((previousTasks) => [
      ...previousTasks,
      {
        ...task,
        id: Date.now().toString(),
        completed: false,
      },
    ]);
  }

  function toggleTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function updateTask(id: string, updatedTask: NewTask) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}
