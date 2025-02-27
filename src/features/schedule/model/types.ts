// Define types for the Schedule feature

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  // Add more fields as needed
}
