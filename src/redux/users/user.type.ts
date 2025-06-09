

export enum Role {
  ADMIN = 'admin',
  FRONT_END_DEVELOPER = 'Front_end_developer',
  SOCIAL_MEDIA_EXECUTIVE = 'Social media executive',
  DIGITAL_MARKETER = 'Digital marketer',
}


  
export interface User{
  id:number
    name:string
    email:string
    password:string
    role:Role
}

