import Image from "next/image";
import React from "react";

export default async function Page() {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-16">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                        About Us
                    </h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">
                        Proident consequat voluptate adipisicing laboris
                        consequat fugiat eu dolore do nulla aute. Enim aute
                        deserunt commodo qui amet aliqua laboris in consectetur
                        incididunt officia qui nostrud. Laborum excepteur non
                        sunt dolore sunt consequat nulla consectetur labore
                        eiusmod ut labore proident ea. Culpa sint aliquip
                        aliquip adipisicing ut duis sint in esse mollit
                        reprehenderit. Dolore nulla sit eiusmod et consequat
                        fugiat laboris exercitation cupidatat labore nulla. Id
                        deserunt in elit aliqua non qui. Ullamco laborum duis
                        adipisicing cupidatat nulla. Proident anim proident
                        dolor eu do quis. Voluptate excepteur quis pariatur duis
                        est amet. Ex labore officia eiusmod eiusmod in tempor
                        sit proident esse ut deserunt. Lorem non ad tempor aute
                        laborum adipisicing deserunt irure cupidatat non cillum
                        consectetur quis. Dolore adipisicing voluptate quis
                        irure minim ad eu consequat. Eu labore mollit magna non
                        officia consequat eiusmod. Ad sit magna tempor enim
                        consectetur id dolore commodo ipsum dolore deserunt.
                        Irure consequat elit elit occaecat sit id cillum ut qui
                        non velit voluptate mollit et. Adipisicing et ad
                        excepteur anim eiusmod mollit eiusmod sint.
                        Reprehenderit ea esse pariatur enim in nisi quis nostrud
                        dolor et esse sunt dolore duis. Proident duis qui in
                        adipisicing eu officia minim Lorem commodo in id Lorem
                        laborum. Do esse ipsum irure incididunt consectetur
                        tempor.
                    </p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <Image
                        width={800}
                        height={400}
                        src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                        alt="A group of People"
                    />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4   rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <Image
                                width={200}
                                height={100}
                                className="md:block hidden"
                                src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                                alt="Alexa featured Img"
                            />
                            <Image
                                width={200}
                                height={100}
                                className="md:hidden block"
                                src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                                alt="Alexa featured Img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Alexa
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <Image
                                width={200}
                                height={100}
                                className="md:block hidden"
                                src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                                alt="Olivia featured Img"
                            />
                            <Image
                                width={200}
                                height={100}
                                className="md:hidden block"
                                src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
                                alt="Olivia featured Img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Olivia
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <Image
                                width={200}
                                height={100}
                                className="md:block hidden"
                                src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                                alt="Liam featued Img"
                            />
                            <Image
                                width={200}
                                height={100}
                                className="md:hidden block"
                                src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                                alt="Liam featued Img"
                            />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                                Liam
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                        Our Story
                    </h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">
                        Amet incididunt enim ea officia cillum. Adipisicing ut
                        officia dolor ex tempor anim sint occaecat sunt eu
                        incididunt sint sint. Nisi labore proident deserunt
                        culpa tempor anim quis est duis officia. Anim deserunt
                        id tempor excepteur est. Incididunt occaecat aliquip in
                        ut commodo commodo sunt consequat aliqua cupidatat ut
                        commodo sit elit. Ipsum nisi occaecat ea enim aliqua.
                        Reprehenderit dolore velit ullamco cillum aute Lorem
                        tempor reprehenderit laboris. Dolore exercitation
                        adipisicing exercitation ad quis esse reprehenderit
                        reprehenderit mollit et labore. Ut sit magna laboris
                        officia nulla. Magna voluptate laborum adipisicing
                        aliquip aute laboris nostrud ipsum aliquip tempor.
                        Cillum culpa sit est pariatur ipsum consequat quis amet
                        commodo deserunt officia. Sit id excepteur reprehenderit
                        qui ad do reprehenderit nisi ex eu eiusmod dolore duis.
                        Nulla ipsum sit nulla consectetur labore anim ad amet
                        duis est duis. Ullamco cillum aute reprehenderit
                        exercitation laborum nostrud excepteur.
                    </p>
                </div>
            </div>
        </div>
    );
}
