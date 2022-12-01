import React, { useEffect, useContext} from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from "react-meta-tags"

import { PageContext } from "store/context"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { useDispatch, useSelector } from "react-redux";

//dashboard
import { getChartsData } from "store/actions";

//utils
import { formatNumber } from "utils";

import './index.styles.css'

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import Earning from "./earning"
import SalesAnalytics from "./sales-analytics"
import TotalSellingProduct from "./total-selling-product"
import Tasks from "./tasks"
import ChatBox from "./chat-box"
import { ChartComp } from "./Chart";

const DashboardSaas = props => {

  const dispatch = useDispatch();
  const { setCurrentPage } = useContext(PageContext)

  const { error, loading, chartsData } = useSelector(state => ({
    error: state.Dashboard.error,
    loading: state.Dashboard.loading,
    chartsData: state.Dashboard.chartsData
  }));

  const reports = [
    {
      icon: "bx bx-user-circle",
      title: "Users",
      value: chartsData?.data?.UserStats[0]?.totalUsers || 0,
      color: "success",
    },

    {
      icon: "bx bx-money",
      title: "Fund",
      value: "$" + formatNumber(chartsData?.data?.TransactionStats[0]?.totalFunding) || 3220,
      color: "success",
    },
    {
      icon: "bx bx-layer",
      title: "Total Products",
      value: "$" + formatNumber(chartsData?.data?.WithdrawalStats[0]?.totalWithdraws) || 2000,
      color: "warning",
    },
    {
      icon: "bx bx-message-square",
      title: "Pending",
      value: "$" + formatNumber(chartsData?.data?.TotalSwapAndCashProducts) || 12500,
      color: "success",
    },
  ];

  const report2 = [
    {
      icon: "bx bx-wallet-alt",
      title: "Just Added",
      value: "$" + formatNumber(chartsData?.data?.TotalCashProducts) || 0,
      color: "warning",
    },
    {
      icon: "bx bx-transfer-alt",
      title: "Disputes",
      value: "$" + formatNumber(chartsData?.data?.TotalSwapProducts) || 0,
      color: "success",
    },

  ];

  useEffect(() => {
    // dispatch(getChartsData());
    setCurrentPage('Stats')
  }, []);


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Online Farms
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Stats" />

          {/* Card User */}
          <CardUser data={chartsData?.data} />
          <Row style={{marginTop: '10px'}}>
            {/* welcome card */}
            <Col xl="6" className="padd">
              <ChartComp />
            </Col>
            <Col xl='6'>
              <Row>
                {/*mimi widgets */}
                <MiniWidget loading={loading} reports={reports} />
                <MiniWidget loading={loading} reports={report2} />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardSaas
