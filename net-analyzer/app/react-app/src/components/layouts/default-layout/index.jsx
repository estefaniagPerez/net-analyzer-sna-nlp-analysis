import { AppShell, Burger, Group, ScrollArea, Title, Text, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import graph_image from '../../../assets/network.png';
import { Link, Outlet } from 'react-router-dom'; 
import { IconCategoryFilled, IconWorld, IconShieldCheck, IconChevronRight, IconUserBolt, IconChartDots3, IconBrandReact } from '@tabler/icons-react';

export const DefaultLayout = ({ children }) => {
  
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const togMobile = () => {toggleMobile()};
  const togDesktop = () => {toggleDesktop()};

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250, breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },}}
      padding="md">
      <Header mobileOpened={mobileOpened} desktopOpened={desktopOpened} toggleMobile={togMobile} toggleDesktop={togDesktop} />
      <Navigation />
      <Main children={children}/>
    </AppShell>
  );
};

const Main = ({ children }) => {
  return(      
    <AppShell.Main>
        <Outlet />
        {children}
    </AppShell.Main>);
}

const Header = ({mobileOpened, desktopOpened, toggleMobile,  toggleDesktop}) => {
  
  return (
    <AppShell.Header>
        <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Group align="flex-end">
              <img src= {graph_image} alt="Custom Logo" width={30} />
              <Title order={4}>NET-ANALYZER</Title>
            </Group>
          </Group>
    </AppShell.Header>
  );
}

const Navigation = () => {
  const items = NavigationItems();

  return (
    <AppShell.Navbar p="md">
        <AppShell.Section>
          <Group align="flex-end" >
            <IconCategoryFilled size={30}/>
            <Title order={4}>MENU</Title>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow my="md" component={ScrollArea}> {items} </AppShell.Section>

        <AppShell.Section>
          <div style={{ borderTop: '1px solid #ccc', paddingTop: '15px', paddingLeft: '15px'}}>
            <Group align="flex-end" >
              <IconBrandReact stroke={1} size={20}/>
              <Text size="xs" sx={{lineHeight: 1}}> - version 0.0.1 - </Text>
            </Group>
          </div>
        </AppShell.Section>

      </AppShell.Navbar>
  );
};

const NavigationItems = () => {
  const [active, setActive] = useState(0);
  const data = [
    { icon: IconChartDots3, label: 'Network Graph', description: 'Network Graph Analyzer', href: '/' },
    /*{
      icon: IconWorld,
      label: 'Languaje',
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
      childrenOffset: 28,
      children: <>
          <NavLink label="First child link" href="#required-for-focus" />
          <NavLink label="Second child link" href="#required-for-focus" />
          <NavLink label="Third child link" href="#required-for-focus" />
        </>
    },*/
    { icon: IconUserBolt, label: 'About', href: '/about' },
    { icon: IconShieldCheck, label: 'Privacy & Legal', href: '/legal' },
  ];

  const items = data.map((item, index) => (
    <NavLink
      component={Link} 
      to={item.href}
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      childrenOffset={item.childrenOffset}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color="black" > 
        {item.children}
    </NavLink> ));

  return (<>{items}</>);
}
