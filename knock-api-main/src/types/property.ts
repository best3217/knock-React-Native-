export interface IProperty {}

export enum EPropertyType {
  CONDO = "condo",
  TOWNHOUSE = "townhouse",
  DUPLEX = "duplex",
  COMMERCIAL = "commercial",
  SINGLE_FAMILY_HOUSE = "single_family_house"
}


export enum EPropertyTypeID {
  SINGLE_FAMILY_HOUSE = "1",
  CONDO = "2",
  TOWNHOUSE = "3",
  DUPLEX = "4",
  COMMERCIAL = "5",
}

export enum EPropertyVerify{
  NON_VERIFIED = 0,
  PENDING_VERIFY = 1,
  IS_VERIFIED = 2
}