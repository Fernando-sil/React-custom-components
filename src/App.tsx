import "./App.css";
import { MdOutlineAdsClick } from "react-icons/md";
import Button from "./components/Button/Button";
import { SideMenu, SideMenuBody } from "./components/SideMenu/SideMenu";
import {
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerContentTitle,
  DrawerTrigger,
} from "./components/Drawer/Drawer";
import { Carousel } from "./components/Carousel/Carousel";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeading,
  ModalTitle,
  ModalTrigger,
} from "./components/Modal/Modal";
import { ToolTip } from "./components/ToolTip/ToolTip";
import { FaEllipsisV, FaFire } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  NavigationMenu,
  NavigationMenuBody,
} from "./components/NavigationMenu/NavigationMenu";
import {
  Accordion2,
  Accordion2Content,
  Accordion2Label,
} from "./components/Accordion/Accordion";
import {
  Collapseable,
  CollapseableContent,
  CollapseableSummary,
} from "./components/Collapseable/Collapsable";
import { useContext } from "react";
import { ToastContext } from "./components/Toaster/ToastProvider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/Card/Card";

function App() {
  const { showToastFail, showToast } = useContext(ToastContext);
  // const space = Array.from({ length: 100 }, () =>
  //   Math.floor(Math.random() * 100 + 0)
  // );
  // console.log({ space });

  // const top = Array.from({ length: 100 }, () =>
  //   Math.floor(Math.random() * 100 + 0)
  // );
  // console.log({ top });

  // const size = Array.from({ length: 100 }, () =>
  //   Math.floor(Math.random() * 5 + 0)
  // );
  // const time = Array.from({ length: 100 }, () =>
  //   Math.floor(Math.random() * 5 + 2)
  // );
  // const blur = Array.from({ length: 100 }, () =>
  //   Math.floor(Math.random() * 10 + 0)
  // );

  return (
    <>
      <SideMenu variant={"secondary"}>
        <SideMenuBody>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Pricing</a>
          <a href="#">Contact us</a>
        </SideMenuBody>
      </SideMenu>
      <Button size={"medium"} variant={"outline"}>
        <MdOutlineAdsClick />
        Click me
      </Button>
      <Drawer orientation={"horizontal"} variant={"accent"}>
        <DrawerTrigger>
          <Button>
            {/* <MdOutlineAdsClick /> */}
            Click me
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerContentTitle>This is a title</DrawerContentTitle>
          <DrawerContentBody>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
            veritatis quam quaerat animi voluptatum nam voluptates est
            laboriosam, minima nemo sequi sunt nulla magnam rerum reprehenderit.
            Ipsa delectus nam ex? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Explicabo mollitia recusandae quo? Ipsum ducimus
            iste tempora architecto possimus quos, provident iusto perspiciatis
            impedit culpa quas officiis facere beatae, earum quidem.
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
      <div style={{ display: "flex" }}>
        <NavigationMenu label="Menu" style={{ color: "white" }}>
          <NavigationMenuBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            error, perferendis voluptate assumenda fugiat dolorem aperiam
            dignissimos ducimus nulla natus ut iste repellendus eum debitis
            nihil veniam ea voluptates. Sequi!
          </NavigationMenuBody>
        </NavigationMenu>
        <NavigationMenu label="Menu2">
          <NavigationMenuBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            error, perferendis voluptate assumenda fugiat dolorem aperiam
            dignissimos
          </NavigationMenuBody>
        </NavigationMenu>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Carousel size={"large"}>
          <img src="https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg" />
          <img src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg" />
          <img src="https://cats.com/wp-content/uploads/2024/02/96E4B546-9BE7-4977-9A29-05F2D9BB47BC_1_102_a-e1711411797978.jpeg" />
          <img src="https://smcl.org/wp-content/uploads/sites/22/2018/10/Black-Cats-Are-the-Best-Cats-banner.png" />
        </Carousel>
      </div>
      <Modal>
        <ModalTrigger>
          <Button>Modal</Button>
        </ModalTrigger>
        <ModalBody variant={"accent"}>
          <ModalHeading>
            <ModalTitle>This is a title</ModalTitle>
          </ModalHeading>
          <ModalContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            quaerat fuga, fugit excepturi autem cupiditate et doloribus minima?
            Voluptas laborum ex illum accusamus, atque dolores nulla ipsam sequi
            sint sunt.
          </ModalContent>
          <ModalFooter>This is a footer</ModalFooter>
        </ModalBody>
      </Modal>
      <Accordion2>
        <Accordion2Label>Accordion css</Accordion2Label>
        <Accordion2Content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
          repudiandae accusantium provident, sequi ipsum esse, harum dolorem ut
          earum ratione ipsa beatae eius ducimus rem voluptates dicta. Error,
          rerum? Quas?
        </Accordion2Content>
      </Accordion2>
      <Collapseable>
        <CollapseableSummary
          style={{
            height: "2rem",
            width: "2rem",
            padding: "0.5rem",
            borderRadius: "10px",
            cursor: "pointer",
            backgroundColor: "lightgray",
          }}
          id="1"
        >
          <FaEllipsisV />
        </CollapseableSummary>
        <CollapseableContent variant={"accent"}>
          <li>Edit</li>
          <li>Delete</li>
          <Collapseable>
            <CollapseableSummary id="2">Profile</CollapseableSummary>
            <CollapseableContent variant={"accent"}>
              <li>view</li>
              <li>share</li>
            </CollapseableContent>
          </Collapseable>
        </CollapseableContent>
      </Collapseable>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <ToolTip text="Datahbhbhbhb" color="#ffe4c4">
          <IconContext.Provider
            value={{
              size: "60",
              style: {
                backgroundColor: "cadetblue",
                padding: "0.5rem",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.473)",
              },
            }}
          >
            <FaFire />
          </IconContext.Provider>
        </ToolTip>
        <ToolTip text="Red" color="#ffc4c4">
          <IconContext.Provider
            value={{
              size: "30",
              style: {
                backgroundColor: "cadetblue",
                padding: "0.5rem",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.473)",
              },
            }}
          >
            <FaFire />
          </IconContext.Provider>
        </ToolTip>
      </div>
      <Button onClick={() => showToastFail("Toast created!")}>toast</Button>
      <Button
        onClick={() =>
          showToast("Custom Toast", "Attention", {
            toastStyles: { backgroundColor: "coral" },
          })
        }
      >
        toast
      </Button>
      <Card
        size={"small"}
        variant={"accent"}
        style={{ color: "var(--color-secondary)" }}
      >
        <CardHeader>
          <CardTitle>This is a header</CardTitle>
        </CardHeader>
        <CardContent>
          <p>this is the content section</p>
          <p>this is the content section</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam odit
            adipisci, facilis consequuntur vitae laudantium nam minima officiis
            fuga amet totam pariatur corrupti! Praesentium sed, cum possimus
            suscipit culpa dolor?
          </p>
        </CardContent>
        <CardFooter>
          <p>this is the footer</p>
        </CardFooter>
      </Card>
    </>
  );
}

export default App;
