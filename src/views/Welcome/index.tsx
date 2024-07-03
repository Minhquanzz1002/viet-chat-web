import Carousel, {Slide} from "../../components/Carousel";

const WelcomeView = () => {
    const slides: Slide[] = [
        {
            image: "./carousel-1.png",
            title: "Nhắn tin nhiều hơn, soạn thảo ít hơn",
            description: "Sử dụng tin nhắn nhanh để lưu các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ",
        },
        {
            image: "./carousel-2.png",
            title: "Tin nhắn tự xóa",
            description: "Từ giờ tin nhắn đã có thể tự động xóa sau khoảng thời gian nhất định",
        },
        {
            image: "./carousel-3.jpg",
            title: "Gọi nhóm và làm việc hiệu quả với Viet Chat Group Call",
            description: "Trao đổi công việc mọi lúc mọi nơi",
        },
        {
            image: "./carousel-4.jpg",
            title: "Trải nghiệm xuyên suốt",
            description: "Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ",
        },
        {
            image: "./carousel-5.png",
            title: "Gửi file nặng",
            description: "Đã có Viet Chat PC xử hết",
        },
        {
            image: "./carousel-6.jpg",
            title: "Chat nhóm với đồng nghiệp",
            description: "Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính",
        },
        {
            image: "./carousel-7.jpg",
            title: "Giải quyết công việc hiệu quả hơn, lên đến 40%",
            description: "Với Viet Chat PC",
        }
    ]
    return (
        <div className="h-screen flex-1 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-1/2">
                <div className="font-light text-2xl">Chào mừng đến với <span
                    className="font-semibold">Viet Chat PC!</span></div>
                <p className="text-center text-sm">Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
                    thân, bạn bè
                    được tối ưu hóa cho máy tính của bạn</p>
            </div>

            <Carousel slides={slides}/>
        </div>
    );
};

export default WelcomeView;