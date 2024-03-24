import { Table, Spin, Row, Col } from "antd";

export default function AntTable({
  loading,
  dataSource,
  columns,
  pagination,
  key,
  bordered,
}) {
  return (
    <Row gutter={[16, 5]}>
      <Col span={24}>
        <div className="mt-3 antdTable">
          <Spin tip="Loading..." spinning={!!loading}>
            <Table
              bordered={bordered}
              dataSource={dataSource}
              columns={columns}
              key={key}
              pagination={pagination}
            />
          </Spin>
        </div>
      </Col>
    </Row>
  );
}
