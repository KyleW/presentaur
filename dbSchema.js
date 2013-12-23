/* the DB is called presDb
meeting documents go in a collection called meetings (presDB.meetings)
user documents go in a collection called users (presDB.users)

the order of speakers is set by the order of the array. if you want to change the speaker order, you must rearrange the array.

Meeting Documents take the following form:

{
  meetingNum:47, //Do I need this or should I use the built in object id?
  meetingName:"Super Awesome Demo Jam",
  speakers:[
    {
      speakerName:"Kyle Warneck"
      contentUrl: ["http://www.AmIAwesome.com"]
      //Note this is an array so we can have multiple urls per speaker and those urls are ordered
    },
    {
      speakerName: "Eric",
      contentUrl: ["www.HackReactEric.com"]
      //Note this is an array so we can have multiple urls per speaker and those urls are ordered
    }
  ],


//Stuff we'll add this stuff later
  meetingOwnerId: 12345,
  meetingDate: 12/23/13,  //investigate date-time formats
  meetingStartTime: 1:00 PM,
  meetingEndTime: 2:00 PM,
  meetingLength: 60   //calculated if we ask for endtime?
}

*/