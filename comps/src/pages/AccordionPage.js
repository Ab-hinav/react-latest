
import Accordion from "../components/Accordion";

function AccordionPage() {

    let items = [
        {   
            id: 1,
            header: "heading 1",
            content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, qua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lm."
        },
        {   
            id: 2,
            header: "heading 2",
            content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, qua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lm."
        },
        {   
            id: 3,
            header: "heading 3",
            content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, qua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lm."
        }
    ]

    return (
        <div>
            <Accordion items={items}  />
        </div>
    );
}

export default AccordionPage;
