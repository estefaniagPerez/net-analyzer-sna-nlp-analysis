import { AppShell, Group, Text, Stack, Input, Button } from '@mantine/core';
import { IconChartDots3, IconAffiliate, IconTrophy, IconBuildingBridge, IconDownload} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import '../assets/sidebar.css';
import { ComboBox } from '../../../components/ui/combo-box.jsx';


export const ActionSidebar = ({onLoadGraph, analyzeNet, showInfluencers, showBridges}) => {
    return(
      
        <>
            <AppShell.Section my="md" px="md">
            <Group align="end" pb={8}>
                
                <IconChartDots3 size={26} stroke={1}/>
                <Text size='md'>Analyzer Actions</Text>
                {/*
                <IconChartDots3 size={26} stroke={2}/>
                <Title order={6}>Analyzer Actions</Title>*/}
            </Group>
            </AppShell.Section>
            <AppShell.Section grow px="md">
                <ActionForm onLoadGraph={onLoadGraph}/>
            </AppShell.Section>
        </>
    );
}

const ActionForm = ({onLoadGraph, analyzeNet, showInfluencers, showBridges}) => {
    const datasets = ['Hate Speech Dataset'];
    const models = ['Hate Speech Model'];
    const color = "yellow";
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          termsOfService: false,
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}   >
          <Stack spacing="md">
            <ComboBox lbl="Dataset" descp="The dataset to be analyzed" list_options={datasets} />
            <ComboBox lbl="NLP Model Chain" descp="The models used to analyze the messages" list_options={models}/>
            <Button size="lg" justify="space-between" radius="md" color={color} rightSection={<IconAffiliate size={25} stroke={1} />} variant="filled" fullWidth onClick={onLoadGraph} > <Text>Analyze Network</Text></Button>
           {/* <Button size="lg" justify="space-between" radius="md" color={color} rightSection={<IconAffiliate size={25} stroke={1} />} variant="outline" fullWidth > <Text>Analyze Network</Text></Button>
            <Button size="lg" justify="space-between" radius="md" color={color} rightSection={<IconTrophy size={25} stroke={1}/>} variant="outline" fullWidth ><Text>Show Influencers</Text></Button>
            <Button size="lg" justify="space-between" radius="md" color={color} rightSection={<IconBuildingBridge size={25} stroke={1} />} variant="outline" fullWidth ><Text>Show Bridges</Text></Button> */}
          </Stack>
        </form>
      );
}//IconFidgetSpinner

function InputWrapper({lbl, descp, err,placeholder}) {
    return (
      <Input.Wrapper 
        label={lbl} 
        description={descp} 
        error={err} 
        className="left-aligned-wrapper">
            <Input placeholder={placeholder} />
      </Input.Wrapper>
    );
}