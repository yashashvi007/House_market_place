import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import {useState , useEffect} from 'react'
import { Link , useNavigate , useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import shareIcon from '../assets/svg/shareIcon.svg'
import Spinner from '../components/Spinner'


export default function Lisiting() {
  
    const [listing , setListing] = useState(null)
    const [loading , setLoading] = useState(true)
    const [shareLinkCopied , setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(()=>{
        const fetchListing = async ()=>{
            const docRef = doc(db , 'listings' , params.listingId )
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                console.log(docSnap.data());
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    } , [navigate , params.listingId ])

    if(loading){
        return <Spinner/>
    }

    return (
        <main>
            <div className='shareIconDiv' onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(()=>{
                    setShareLinkCopied(false)
                } , 2000)
            }} >
                <img alt='' src={shareIcon} />
            </div>
            
            {shareLinkCopied && <p className='linkCopied' >Link Copied!</p> }
            
           

            <p className='listingLocation'>
                {listing.location}
            </p>

            <p className='listingType' >
                For {listing.type === 'rent' ? 'Rent' : 'Sale' }
            </p>
            {listing.offer && (
                <p className='dicountPrice' >
                    ${listing.regularPrice - listing.discountPrice } dicount
                </p>
            ) }

            <ul className='listingDetailsList' >  
                <li>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom' }
                </li>
                <li>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom' }
                </li>
                <li>{listing.parking && 'Parking Spot' }</li>
                <li>{listing.furnished && 'Furnished' }</li>
            </ul>

            <p className='listingLocationTitle' >
                location
            </p>

            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
                    Contact Landlord
                </Link>
            ) }

        </main>
    )
}
