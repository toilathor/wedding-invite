export interface BannerData {
  groom: string;
  bride: string;
  groomFullName?: string;
  brideFullName?: string;
  title: string;
  day: string;
  month: string;
  year: string;
  image1: string;
  image2: string;
  imageDecorLeft?: string;
  imageDecorRight?: string;
}

export interface InvitationData {
  time: string;
  day: string;
  month: string;
  year: string;
  location: string;
  subDescription: string;
  descriptionHtml: string;
  countdownDate: string; // ISO string
}

export interface IntroData {
  title: string;
  nameGroom: string;
  fullNameGroom?: string;
  nameBride: string;
  fullNameBride?: string;
  imageGroom: string;
  imageBride: string;
  contentGroom: string;
  contentBride: string;
  description: string;
}

export interface StoryData {
  title: string;
  contentHtml: string;
  image: string;
}

export interface MilestoneItem {
  day: string;
  month: string;
  year: string;
  title: string;
  content: string;
  picture: string;
  imagePosition?: string;
}

export interface TimelineData {
  mainTitle: string;
  milestone: MilestoneItem[];
}

export interface WeddingEventItem {
  title: string;
  dateTime: string; // ISO or formatted
  displayTime: string;
  displayDate: string;
  address: string;
  link: string;
  icon: string;
}

export interface AlbumData {
  title: string;
  albums: string[];
}

export interface GuestMessage {
  id: number | string;
  name: string;
  content: string;
  createdAt?: string;
  deviceId?: string;
  isPinned?: boolean;
}

export interface BankData {
  nameGroom: string;
  bankNameGroom: string;
  bankNumberGroom: string;
  imageBankGroom: string;
  nameBride: string;
  bankNameBride: string;
  bankNumberBride: string;
  imageBankBride: string;
  description: string;
  coverImage: string;
}

export interface RSVPFormData {
  name: string;
  phone: string;
  isAttending: boolean;
  attendParty?: boolean;
  attendGroom?: boolean;
  attendBride?: boolean;
  guestsCount?: number;
  note?: string;
  createdAt?: any;
  deviceId?: string;
}

export interface WeddingData {
  audioUrl?: string;
  audioUrls?: string[];
  banner: BannerData;
  invitation: InvitationData;
  introduction: IntroData;
  story: StoryData;
  timeline: TimelineData;
  events: WeddingEventItem[];
  album: AlbumData;
  messages: GuestMessage[];
  bank: BankData;
}
