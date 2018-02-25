export interface Workout{
  activityName: string,
  startDate: string,
  //endDate: Date,
  duration: Number, // in miliseconds
  calories?: Number, // in Kcal, optional
  distance?: Number, // in Meters, optional
}
