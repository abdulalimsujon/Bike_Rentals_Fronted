import { Card, Col, Row } from "antd";

const CustomCard = ({ data }) => {
  const { name, image, cc, description } = data;

  return (
    <Row gutter={24} className="dark:text-green-700 text-green-300  ">
      <Col span={24}>
        <Card
          title={
            <div className="bg-green-300 dark:bg-green-700 text-white py-2 rounded pl-3">
              {name}
            </div>
          }
          bordered={false}
          className="w-full h-auto shadow-lg rounded-md text-green-300 dark:text-green-700 bg-slate-700 dark:bg-slate-50 border dark:border-none"
        >
          <Row className="h-full flex-wrap">
            {/* Image Section (On the left side) */}
            <Col span={14} className="flex justify-center items-center p-2">
              <img
                src={image}
                alt={name}
                className="object-cover rounded-md max-h-[280px]"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>

            {/* Text Section (On the right side) */}
            <Col
              span={10}
              className="flex flex-col justify-center p-4 dark:bg-slate-100 text-wrap"
            >
              <h2 className="text-2xl font-bold mb-2">{name}</h2>
              <p className="text-lg font-semibold mb-4">CC: {cc}</p>
              <p className="text-base text-gray-300 dark:text-gray-700">
                {description}
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomCard;
