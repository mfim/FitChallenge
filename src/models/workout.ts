export interface Workout{
  activityName: string,
  startDate: string,
  //endDate: Date,
  duration: number, // in miliseconds
  calories?: number, // in Kcal, optional
  distance?: number, // in Meters, optional
}
