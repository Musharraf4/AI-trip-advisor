import { DestinationType } from "@/interfaces"
import cancunImg from "../public/places/cancun.jpeg"
import costaImg from "../public/places/costa.jpeg"
import hurgadaImg from "../public/places/hurgada.jpeg"
import istanbulImg from "../public/places/istanbul.jpeg"
import parisImg from "../public/places/italy.jpeg"
import newYorkImg from "../public/places/new-york.jpeg"
import orlandoImg from "../public/places/orlando.jpeg"
import sideImg from "../public/places/side.jpeg"
import hunza from "../public/places/hunza.jpeg"
import islamabad from "../public/places/islamabad.jpg"
import naran from "../public/places/naran.jpg"
import murree from "../public/places/murree.jpeg"
import lahore from "../public/places/lahore.jpg"
import swat from "../public/places/swat.jpg"
import skardu from "../public/places/skardu.jpeg"
import kashmir from "../public/places/kashmir.jpeg"


// * constants

export const THREAD_LIST = 'THREAD_LIST'
export const THREAD_ID = 'threadId'
export const DB_NAME = 'tours';

// * app routes
export const ROOT_ROUTE = '/'
export const SELECT_PLAN_ROUTE = '/select-plan'
export const RESULT_ROUTE = '/result'

// * mapped data
export const tripStepper = [
  {
    id: 1,
    title: "Destination"
  },
  {
    id: 2,
    title: "Selected Dates"
  },
  {
    id: 3,
    title: "Trip Type"
  },
  {
    id: 4,
    title: "Interests"
  },
]

export const internationalDestinations: DestinationType[] = [
  { id: 1, image: parisImg, city: 'Paris', country: "France" },
  { id: 2, image: cancunImg, city: 'New York City', country: "United States" },
  { id: 3, image: costaImg, city: 'Orlando', country: "United States" },
  { id: 4, image: hurgadaImg, city: 'Hurghada', country: "Egypt" },
  { id: 5, image: istanbulImg, city: 'Cancun', country: "Mexico" },
  { id: 7, image: orlandoImg, city: 'Istanbul', country: "Turkiye" },
  { id: 6, image: newYorkImg, city: 'Costa Adeje', country: "Spain" },
  { id: 8, image: sideImg, city: 'Side', country: "Turkiye" },
]
export const nationalDestinations: DestinationType[] = [
  { id: 9, image: islamabad, city: 'Islamabad', country: "Pakistan" },
  { id: 10, image: lahore, city: 'Lahore', country: "Pakistan" },
  { id: 11, image: hunza, city: 'Hunza Valley', country: "Pakistan" },
  { id: 12, image: murree, city: 'Murree', country: "Pakistan" },
  { id: 13, image: naran, city: 'Naran Kaghan', country: "Pakistan" },
  { id: 14, image: kashmir, city: 'Kashmir', country: "Pakistan" },
  { id: 15, image: skardu, city: 'Skardu', country: "Pakistan" },
  { id: 16, image: swat, city: 'Swat', country: "Pakistan" },
]

export const allInterestsData = ['Must-see Attractions', 'Hidden Gems', 'Museums', 'History', 'Culture', 'Great Food', 'Outdoors', 'Wine & Beer', 'Arts & Theatre', 'Adventure & Sports']