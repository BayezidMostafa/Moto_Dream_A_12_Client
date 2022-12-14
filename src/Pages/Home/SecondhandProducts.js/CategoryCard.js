import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    const { picture, title, category_name } = category;
    
    return (
        <Link className="" to={`/category/${category_name}`}>
            <div className="shadow-black hover:shadow-lg duration-300 rounded-xl  cursor-pointer">
                <Card className="bg-gray-100 dark:bg-teal-400 dark:text-gray-300">
                    <CardHeader floated={false} className="">
                        <img className="w-full" src={picture} alt="" />
                    </CardHeader>
                    <CardBody className="text-center">
                        <p className="text-3xl font-bold uppercase">{title}</p>
                    </CardBody>
                </Card>
            </div>
        </Link>
    );
}
export default CategoryCard;