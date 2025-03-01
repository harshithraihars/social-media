export type TabType = 'Upcoming' | 'Pending' | 'Recurring' | 'Past' | 'Cancelled';

export type Event = {
  id: string;
  day: string;
  date: string;
  month?: string;
  time: {
    start: string;
    end: string;
  };
  title: string;
  location: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    color: string;
  }[];
  notifications?: number;
  isOnline: boolean;
};

export type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
};

export type EventCardProps = {
  day: string;
  date: string;
  time: string;
  title: string;
  location: string;
  avatars: string[];
  colors: string[];
  hasNotification?: boolean;
  isFirst?:boolean
};