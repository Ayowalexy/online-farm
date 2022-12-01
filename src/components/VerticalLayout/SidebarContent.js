import PropTypes from "prop-types";
import React, { useEffect, useRef, useContext } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

//context
import { PageContext } from "store/context";

import { useHistory } from "react-router-dom";

import { BiStats, BiUserCircle, BiCreditCardAlt, BiWalletAlt, BiHomeCircle } from 'react-icons/bi';
import { IoMdCash } from 'react-icons/io'
import { IoBagSharp, IoReceiptOutline } from 'react-icons/io5'
import { AiOutlineSwap, AiOutlineShopping, AiOutlineFund } from 'react-icons/ai';
import { BsCheck2All } from 'react-icons/bs';
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { GiScales } from 'react-icons/gi'


import './side.styles.css'

const SidebarContent = props => {
  const ref = useRef();
  const history = useHistory();

  //context for setting the current product page type
  const { setCurrentPage, currentPage } = useContext(PageContext)

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  const handleLogout = () => {
    localStorage.setItem('token', '');
    history.push('/login')

  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Dashboard")} </li>
              <li
                onClick={() => setCurrentPage('Stats')}
                className="side_"
                style={{
                  backgroundColor: currentPage === 'Stats' ? "rgba(50, 255, 0, 0.19)" : "#fff"
                }}>
                <div className="icon__">
                  <Link
                    style={{
                      color: currentPage === 'Stats' ? '#32FF00' : "#000"
                    }}
                    to="/dashboard" className="">
                    {/* <i className="bx bx-home-circle"></i> */}
                    <BiHomeCircle size={25} />
                    <span>{props.t("Stats")}</span>
                  </Link>
                </div>

              </li>
            {/* <li>
              <Link to="/ecommerce-products" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Online Farms")}</span>
              </Link>


              <ul className="sub-menu" aria-expanded="false">
                

              </ul>
            </li> */}

            <li
              className="side_ all-users"
              onClick={() => {
                const doc = document.querySelector('.all-users');
                // doc.classList.remove('side_');
                // doc.classList.add('active-side');
                setCurrentPage('all-users');
              }}
              style={{
                backgroundColor: currentPage === 'all-users' ? "rgba(50, 255, 0, 0.19)" : "#fff"
              }}
            >
              <div className="icon__">
                <Link
                  style={{
                    color: currentPage === 'all-users' ? '#32FF00' : "#000"
                  }}
                  to="/all-users">
                  {/* <i className='bx bx-stats'></i> */}
                  <BiStats
                    size={30}
                  />
                  <span>{props.t("Users Stats")} </span>
                </Link>
              </div>

            </li>

            <li
              className="side_"
              onClick={() => setCurrentPage('Users')}
              style={{
                backgroundColor: currentPage === 'Users' ? "rgba(50, 255, 0, 0.19)" : "#fff"
              }}
            >
              <div className="icon__">
                <Link
                  style={{
                    color: currentPage === 'Users' ? '#32FF00' : "#000"
                  }}
                  to="/ecommerce-customers">
                  {/* <i className='bx bx-user-circle'></i> */}
                  <BiUserCircle
                    size={25}
                  />
                  <span>{props.t("Users")}</span>
                </Link>
              </div>

            </li>
            <li
              onClick={() => setCurrentPage('All')}
              className="side_"
              style={{
                backgroundColor: currentPage === 'All' ? "rgba(50, 255, 0, 0.19)" : "#fff",
              }}
            >
              <div className="icon__">
                <Link
                  style={{
                    color: currentPage === 'All' ? '#32FF00' : "#000"
                  }}
                  to="/ecommerce-products">
                  {/* <i className='bx bxs-shopping-bags'></i> */}
                  <IoBagSharp size={25} />
                  <span>{props.t("All Products")}</span>
                </Link>
              </div>

            </li>            

            <li
              className="side_"
              onClick={() => setCurrentPage('Orders')}
              style={{
                backgroundColor: currentPage === 'Orders' ? "rgba(50, 255, 0, 0.19)" : "#fff"
              }}
            >
              <div className="icon__">
                <Link
                  style={{
                    color: currentPage === 'Orders' ? '#32FF00' : "#000"
                  }}
                  to="/ecommerce-orders"  >
                  {/* <i className='bx bx-receipt'></i> */}
                  <IoReceiptOutline size={25} />
                  <span>{props.t("Sellers")}</span>
                </Link>
              </div>
            </li>

            

            <li
              className="side_"
              onClick={() => setCurrentPage('Dispute')}
              style={{
                backgroundColor: currentPage === 'Dispute' ? "rgba(50, 255, 0, 0.19)" : "#fff"
              }}
            >
              <div className="icon__">
                <Link
                  style={{
                    color: currentPage === 'Dispute' ? '#32FF00' : "#000"
                  }}
                  to="/ecommerce-checkout" >
                  {/* <i className='bx bx-check-double'></i> */}
                  <GiScales size={25} />
                  <span>{props.t("Dispute")}</span>
                </Link>
              </div>
            </li>

            <li
              className="side_"
              onClick={() => setCurrentPage('Reports')}
              style={{
                backgroundColor: currentPage === 'Reports' ? "rgba(50, 255, 0, 0.19)" : "#fff"
              }}
            >
              <div className="icon__">
                <Link
                  style={{
                    color: currentPage === 'Reports' ? '#32FF00' : "#000"
                  }}
                  to="/ecommerce-checkout" >
                  {/* <i className='bx bxs-report btn__' ></i> */}
                  <HiOutlineDocumentReport size={25} />
                  <span className="btn__">{props.t("Reports")}</span>
                </Link>
              </div>
            </li>

            <li
              // className="side_"

              onClick={() => setCurrentPage('Reports')}
              style={{
              margin: '15px 21px'
              }}
            >
               <Link to='/login' style={{ width: '100%', height: '100%' }} onClick={handleLogout}>
                {/* <i style={{ color: 'red' }} className='bx bx-log-out-circle' ></i> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: 'rgba(255,0,0,1)' }} ><path d="m2 12 5 4v-3h9v-2H7V8z"></path><path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path></svg>

                <span style={{
                  color: 'red',
                  paddingLeft: 10
                }}>{props.t("Logout")}</span>
              </Link>
            </li>

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
