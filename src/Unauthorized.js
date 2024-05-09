import React from 'react'
import Slidebar from './dashboardpage/components/Slidebar'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Unauthorized() {

  var navigate = useNavigate()

  const Page404 = styled.div`
  padding: 40px 0;
  background: #fff;
  font-family: 'Arvo', serif;
`;

const FourZeroFourBg = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
`;

const Title404 = styled.h1`
  font-size: 80px;
`;

const Subtitle404 =styled.h3`
  font-size: 80px;
`;

const Link404 = styled.a`
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
`;

const NavigateToHome =()=>{
  navigate('/')
}

  return (
    <>
      <div>
        <Slidebar />
          <div classname="container">
            <section classname="playlist-form ">
              <section className="page_404">
                <div className="container">
                  <div className="row">	
                    <div className="col-sm-12 ">
                      <div className="col-sm-10 col-sm-offset-1  text-center">
                        <div className="four_zero_four_bg">
                          <h1 className="text-center">403</h1>
                        </div>
                        <div className="contant_box_404">
                          <h3 className="h2">
                            Look like you're lost
                          </h3>
                          <p>Sorry ! You Have No Access To Perform Action In This Page.</p>
                          <a onclick={NavigateToHome} className="link_404">Go Back To Home</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
      </div>
    </>
  )
}

export default Unauthorized