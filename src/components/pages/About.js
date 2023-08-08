import { HiPhoneArrowUpRight } from "react-icons/hi2";
const AboutUs = () => {
    return(
        <div>
            <img className="img"src="https://www.simplilearn.com/ice9/free_resources_article_thumb/tester-or-developer-what-suits-you-the-most.jpg"></img>
            <h1 className="we">Our Story</h1>
            <p>Even three decades into the practice of data warehousing,<br/>
            the profession is lamentably weak when it comes to testing our applications.<br/>
             Much of the lapses are due to the fact that traditional methods<br/>
              have left validation to the end of the project, and of course testing <br/>
              gets squeezed down to often only a few days whenever coding takes longer than expected.</p>
            <h2 className="we"> Our Contacts <HiPhoneArrowUpRight icon={HiPhoneArrowUpRight} />  009-080-700-989</h2>
        </div>
    )
}
export default AboutUs