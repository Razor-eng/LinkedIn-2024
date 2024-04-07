import { Space, Spin } from "antd"

const Spinner = () => {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <Space>
                <Spin size="large" />
            </Space>
            <h2 className="text-3xl mt-5 font-semibold text-cyan-600">Please Wait...</h2>
        </div>
    )
}

export default Spinner
