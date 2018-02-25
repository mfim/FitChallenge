export interface Workout{
  activityName: string,
  startDate: Date,
  endDate: Date,
  duration: Number, // in miliseconds
  calories?: Number, // in Kcal, optional
  distance?: Number, // in Meters, optional
  usrphoto?: URL  // may be the user can add a photo of himself?  let's discuss this..
}
