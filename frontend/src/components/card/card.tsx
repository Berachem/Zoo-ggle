import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
   
  export default function CardWithImage(props: { image: string | undefined; title: any; description: any; gameType: any; playerNumber: any; }) {

    return (
      <Card className="w-96">
        <CardHeader color="blue" className="relative h-56">
          <img
            src={props.image}
            alt="img-blur-shadow"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {props.title}
          </Typography>
          <Typography>
          {props.description}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">
            {props.gameType}
            </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-user"></i> 4
            {props.playerNumber}
          </Typography>
        </CardFooter>
      </Card>
    );
  }