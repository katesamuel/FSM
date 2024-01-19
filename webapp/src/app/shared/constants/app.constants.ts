export class AppConstants {
  // session constants
  public static SESSION_IDLE_TIME = 30 * 60; // total session time is 30 mins
  public static SESSION_TIMEOUT = 0.5 * 60; // fire session expiry alert before 30 seconds
  public static SESSION_PING_TIME = 1 * 60; // in 60 seconds

  // school details
  public static School = {
    name: {
      full: 'Faith School of Music',
      short: 'FSM',
    },
    phone: {
      code: '91',
      mobile: '9080093092',
      landline: '',
    },
    email: 'faithschoolofmusic1@gmail.com',
    address: 'No. 119, Ground floor, Second Cross STreet, Krishna Colony, Trichy Road, Singanallur, Coimbatore - 641005, India',
  };
}
