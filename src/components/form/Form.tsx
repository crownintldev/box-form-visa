import React from 'react'
import Box from '../Box/Box'
import Header from '../header/Header'
import CheckedBox from '../checkbox/CheckedBox'

const Form = () => {
  // same page components start
  const Mention = ({ component, mention }: { component: any, mention: string }) => (
    <div className='flex'>
      <div className='flex space-x-1 '>
        {component}
      </div>
      <span className='text-[7px] ms-[1px]'>{mention}</span>
    </div>
  )
  const MentionContainer = ({ text, item, space, wf }: { wf?: boolean, text: string, item: string[], space?: boolean }) => (
    <ContentOutline>
      <Title>{text}</Title>
      <Boxes wf={wf}>
        <p>:</p>
        <div className={`w-full `}>
          <div className={`flex ${space ? "space-x-4" : "justify-between"} `}>
            {item.map((item: any, i: any) => (
              <Mention key={i}
                component={<CheckedBox />}
                mention={item}
              />
            ))}
          </div>
        </div>
      </Boxes>
    </ContentOutline>
  )

  const FullLineBox = ({ text, italic }: { text: string, italic?: boolean, }) => (
    <ContentOutline>
      <Title><span className={`${italic && "italic"}`}>{text}</span></Title>
      <Boxes wf>
        <p>:</p>
        <Box b={22} />
      </Boxes>
    </ContentOutline>
  )

  const DashBoxes = ({ title, item, wf }: { wf?: boolean, title: string, item: number[] }) => (
    <ContentOutline>
      <Title>{title}</Title>
      <Boxes wf={wf}>
        <p>:</p>
        {item.map((quantity, i) => (
          <>
            <Box b={quantity} key={i} />
            {i !== item.length - 1 && <p>-</p>}
          </>
        ))}
      </Boxes>
    </ContentOutline>
  )
  const MentionDashBoxes = ({ title, item }: { title: string, item: number[] }) => (
    <ContentOutline>
      <Title>{title}</Title>
      <Boxes wf>
        <Mention
          component={
            <>
              <p>:</p>
              {item.map((quantity, i) => (
                <>
                  <Box b={quantity} key={i} />
                  {i !== item.length - 1 && <p>-</p>}
                </>
              ))
              }
            </>
          }
          mention='(DD-MM-YYYY)'
        />
      </Boxes>
    </ContentOutline>
  )
  // **--end same page components
  
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // depends styles
  const Title = ({ children }: { children: React.ReactNode }) => (
    <div className="w-4/12 mt-[2px]">
      <p>
        {children}
      </p>
    </div>
  )
  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h4 className=' font-bold uppercase text-xs'>{children}</h4>
  )
  const Boxes = ({ children, wf }: { children: React.ReactNode, wf?: boolean }) => (
    //  320+128 = 328 
    <div>
      <div className={`w-[272px]`}>
        <div className={`${wf ? "" : "w-[170px] mr-32"} `}>
          <div className='flex space-x-1 items-center'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
  const ContentOutline = ({ children }: { children: React.ReactNode }) => (
    <div className='flex justify-between text-[10px] leading-[10px]' >
      {children}
    </div>
  )
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className='w-[595px] mx-auto space-y-2'>
      <div className='w-[90%] mx-auto mt-8'>
        <Header />
      </div>
      {/* line on header below */}
      <div className=' border border-gray-900 bg-gray-900 h-[1px] w-12/12 mx-auto'>

      </div>
      <div className='ps-4 w-full overflow-hidden '>
        {children}
      </div>
    </div>
  )
  // %%%%%%%%%%%%%%%%%main function%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  return (
    <Layout>
      <div className='w-full flex space-x-4 relative'>
        {/* image at the next of this div, this is flex property */}
        <div className='w-full space-y-1 leading-[1.1px] me-[89px] '>
          {/*  */}
          <DashBoxes title='Date' item={[2, 2, 4]} />
          {/* */}
          <ContentOutline>
            <Title>Application Number</Title>
            <Boxes>
              <p>:</p>
              <Box b={14} />
            </Boxes>
          </ContentOutline>
          {/* */}
          <ContentOutline>
            <Title>Authorization Number</Title>
            <Boxes>
              <p>:</p>
              <Box b={14} />
            </Boxes>
          </ContentOutline>
          {/* *********** */}
          <Heading>1. GENERAL</Heading>
          <ContentOutline>
            <Title>Length of Stay in Indonesia</Title>
            <Boxes>
              <p>:</p>
              <Mention
                component={<Box b={3} />}
                mention='(Days)'
              />
              <div className='pr-2'></div>
              <Mention
                component={<Box b={2} />}
                mention='(Months)'
              />
            </Boxes>
          </ContentOutline>
          <MentionContainer
            text="Type of Visa"
            item={["Diplomatic", "Service/Official", "Visit"]}
          />
          {/*  */}
          <MentionContainer
            text='Category of Visit'
            item={["Single", "Multiple", "Limited Stay"]}
          />
          {/*  */}
          <MentionContainer
            wf
            space
            text='Purpose of Visit'
            item={["Posting", "Working", "Business", "Family", "Tourist", "Social"]}
          />

          <FullLineBox text='Point of Departure' />
          {/*  */}
          <FullLineBox text='Port of Entry in Indonesia' />
          {/*  */}
          <FullLineBox text="Flight/Carrier Name and Number" />

          {/*  */}
          <MentionDashBoxes
            item={[2, 3, 4]}
            title='Date of Entry'
          />
          {/*  */}
          <MentionDashBoxes
            item={[2, 3, 4]}
            title='Date of Departure'
          />
          {/*  */}
          <ContentOutline>
            <Title>Destination Address in Indonesia</Title>
            <Boxes wf>
              <p>:</p>
              <div className='space-y-1'>
                <Box b={22} />
                <Box b={22} />
              </div>
            </Boxes>
          </ContentOutline>
          {/*  */}
          <FullLineBox text='City' />
          <FullLineBox text='Province' />
          <ContentOutline>
            <Title>Phone/Mobile Number</Title>
            <Boxes wf>
              <p>:</p>
              <Box b={3} />
              <p>-</p>
              <Box b={3} />
              <p>-</p>
              <Box b={9} />
            </Boxes>
          </ContentOutline>
          <FullLineBox text='Previous Country Visited' />
          {/* ****Personal Data** */}
          <Heading>II. PERSONAL DATA</Heading>
          <FullLineBox text='First Name' />
          <FullLineBox text='Middle Name' />
          <FullLineBox text='Family/Surename' />
          <MentionContainer
            text='Sex'
            item={["Male", "Female"]}
            space
          />
          {/*  */}
          <MentionContainer
            text='Marital Status'
            item={["Married", "Single"]}
            space
          />
          {/*  */}
          <FullLineBox text='Place of Birth' />
          {/*  */}
          <MentionDashBoxes
            item={[2, 3, 4]}
            title='Date of Birth'
          />
          {/*  */}
          <ContentOutline>
            <Title>
              <div className='flex flex-col'>
              Nationality 
            <p className='pt-2'>Address</p>
            </div> </Title>
            <Boxes wf>
              {/* <p>:</p> */}
              <div className='space-y-1'>
                <span className='flex '>: &nbsp;&nbsp;<Box b={22} /></span>
                <span className='flex '>&nbsp; &nbsp;&nbsp;<Box b={22} /></span>
                <span className='flex '>&nbsp; &nbsp;&nbsp;<Box b={22} /></span>
              </div>
            </Boxes>
          </ContentOutline>
          {/*  */}
          <FullLineBox text='City' />
          {/*  */}
          <FullLineBox text='Province' />
          {/*  */}
          <FullLineBox text='State/Country' />
          {/*  */}
          <DashBoxes wf
            item={[3, 3, 9]}
            title='Mobile Number'
          />
          {/*  */}
          <div className='border p-1 border-gray-500 space-y-1'>
            <FullLineBox text="Father's name" italic />
            <FullLineBox text='Occupation' italic />
            <FullLineBox text="Mother's name" italic />
            <FullLineBox text='Occupation' italic />
          </div>
          {/*  */}
          <FullLineBox text='Occupation' />
          <FullLineBox text='Current Position/Designation' />
          <FullLineBox text='Name of Institution/Company' />
          {/*  */}
          <ContentOutline>
            <Title>Address </Title>
            <Boxes wf>
              <p>:</p>
              <div className='space-y-1'>
                <Box b={22} />
              </div>
            </Boxes>
          </ContentOutline>
          {/*  */}
          <FullLineBox text='City' />
          <FullLineBox text='Province' />
          <FullLineBox text='State/Country' />
          {/*  */}
          <DashBoxes wf item={[3, 3, 9]} title='Phone Number' />
          {/* **********Passport  Information*************** */}
          <Heading>III. Passport Information</Heading>
          <MentionContainer
            wf
            text="Type of Visa"
            item={["Diplomatic", "Service", "UNLP", "Ordinary"]}
          />
          <FullLineBox text='Passport Number' />
          <FullLineBox text='Place of Issue' />
          <MentionDashBoxes item={[2, 3, 4]} title='Date of Issue' />
          <MentionDashBoxes item={[2, 3, 4]} title='Date of Expiry' />

          {/* **********Sponsorship Information*************** */}
          <Heading>IV. Sponsorship Information</Heading>
          <>
            <MentionContainer
              wf
              text="Sponsorship in Indonesia"
              item={["Individual", "Government", "Company", "Other"]}
            />
            <MentionContainer
              wf
              text=""
              item={["Institutions", "International Organization", "NGO"]}
            />
          </>
          <FullLineBox text='Name of Individual' />
          <FullLineBox text='Current Position' />
          <FullLineBox text={`Name of Institution/Company/Hotel/International Organization/NGO`} />
          <ContentOutline>
            <Title>Address </Title>
            <Boxes wf>
              <p>:</p>
              <div className='space-y-1'>
                <Box b={22} />
                <Box b={22} />
              </div>
            </Boxes>
          </ContentOutline>
          <FullLineBox text='City' />
          <FullLineBox text='Country' />
          <DashBoxes wf title='Mobile/Phone Number' item={[3, 3, 9]} />
          {/* ********************Miscellaneous*************************************8 */}
          <Heading>V. MISCELLANEOUS</Heading>
          <MentionContainer text='Have you ever been to Indonesia before ?'
            item={["yes", "No"]}
          />
          <MentionDashBoxes
            title='If "Yes" date of visit '
            item={[2, 2, 4]}
          />
          <FullLineBox text='Purpose of Visit' />
          <MentionContainer
            text='Are you in possesion of any countries travel documents'
            item={["yes", "No"]}
          />
          <MentionContainer
            text='Do you have previous visa to enter Indonesia ? '
            item={["yes", "No"]}
          />
          <MentionContainer
            text='Have your visa application been denied before? '
            item={["yes", "No"]}
          />
          <MentionContainer
            text='Have you been forced to leave Indonesia?'
            item={["yes", "No"]}
          />
          <MentionContainer
            text='Have you ever been committed a crime or any Offence?'
            item={["yes", "No"]}
          />
          <MentionContainer
            text='Do you have health problem condition ?'
            item={["yes", "No"]}
          />
          <FullLineBox text='If "Yes" give detail ' />
          <MentionContainer
            text='Do you have fully vaccinated Covid-19/Booster? '
            item={["yes", "No"]}
          />
          <MentionContainer
            text='Have you been previously posted abroad?'
            item={["yes", "No"]}
          />
          {/*  */}
          <ContentOutline>
            <Title> If &quot;Yes&quot; give detail 2 previous posting </Title>
            <Boxes wf>
              <div className='space-y-1'>

                <div className='flex items-center space-x-3 space-y-0 p-0 m-0 '>
                  <p>:</p>
                  <div className='flex items-center space-x-1'>
                    <p>1</p>
                    <Box b={21} />
                  </div>
                </div>
                <div className='flex items-center space-x-3 space-y-0 p-0 m-0'>
                  <p></p>
                  <div className='flex items-center space-x-1'>
                    <p>2</p>
                    <Box b={21} />
                  </div>
                </div>
              </div>
            </Boxes>
          </ContentOutline>
          {/*  */}
          <FullLineBox text='Return ticket of the Airline Company' />
          <FullLineBox text='place of Issue' />
          <MentionDashBoxes
            title='Date of Issue'
            item={[2, 2, 4]}
          />
          <MentionDashBoxes
            title='Date of Expiry'
            item={[2, 2, 4]}
          />
          {/* ******End lines************ */}
          <div className='pt-3 space-y-3'>
            <p className='font-semibold text-[10px] leading-[12px] mb-3'>
              I, hereby declare that the statements given above are true and I understand that even if granted a visa,
              <br />
              prerequites checked administration at the airport remains the discreation of the Immigration authorities in Indonesia
            </p>
            <div>
              <span className='text-sm p-0 m-0'>
                Applicant`s signature and name
              </span>
              <div className='flex space-x-4'>
                <div className='w-1 h-1 border border-gray-500 px-28 py-8'></div>
                <div className='flex mt-10 items-start'>
                  <div className='flex space-x-1 items-center '>
                    <Box b={2} />
                    <p>-</p>

                    <Box b={2} />
                    <p>-</p>
                    <Box b={4} />
                  </div>
                  <span className=' text-[10px] leading-[12px] ms-[1px]'>(DD-MM-YYYY)</span>
                </div>
              </div>
            </div>
            <p className='font-semibold text-[10px] leading-[12px]'>
              &quot;Passport must be valid not least than 6 (six) months before departure&quot;</p>
          </div>
        </div>


        {/* +++++++++++++++++++++++++++++pic+++++++++++++++++++++++++++++++++++++++= */}
        <div className='w-28 h-auto absolute right-0'>
          <div className='p-4 h-28 border border-gray-800'></div>
        </div>

      </div>
    </Layout>
  )
}

export default Form