import React, { useEffect, useState } from 'react';
import { Card, Text, Title, Group, Stack, Flex } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import InfoIcon from '@mui/icons-material/Info';
import {getUserRisk} from '../api/users';

export const UserRisks = ({user_id, is_influencer, is_bridge}) => {
    const [count, setCount] = useState(0)
    const default_risk = {
      'status': 0,
      'risk': {'risk': -1, 'freq': -1, 'user_type': 'UNKNOWN'}};

    const [riskData, setRiskData] = useState(default_risk);

    useEffect(() => {
      setRiskData(default_risk);
      getUserRisk('hs', user_id, is_influencer, is_bridge).then(data => {
        if( data !== undefined){
          setRiskData(data);
        }
        else {
          setRiskData();
        }
      });
    }, [user_id]);
    

    return (
      <Card withBorder style={{ maxWidth: 250 }} radius="md" shadow="sm" padding="xs" >     
      {(!riskData || !riskData.risk || (riskData.status < 0 && riskData.risk.risk < 1)) && (<p>Error Loading Data, try with another node or check your connection</p>)}
      {(riskData && riskData.status === 0) && (<p>Loading User Data</p>)}
      {(riskData&& riskData.status !== 0 && riskData.risk) && <UserRiskContent userId={user_id} riskData={riskData}/>}
      </Card>);
      
};

const UserRiskContent = ({userId, riskData}) => {
  const fix_text = (field) => {
    if (field === undefined || field === '') return '';
    return field.charAt(0) + field.substring(1).toLowerCase();
  }

  const formattedValue = (value) => { 
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  };

  return (
     <>
        <Flex align="center" gap="xs">
          <InfoIcon style={{ color: riskData.risk.risk === 2? 'red' : riskData.risk.risk === 1? 'orange' : 'green' }}  size={35} />
          <Title order={3} style={{ fontWeight:'normal' }}>
            ID de Usuario: {userId}
          </Title>
        </Flex>

        <Stack spacing="sm" style={{ marginTop: '2rem', marginBottom: '1rem', marginRight: '0.25rem', marginLeft: '0.25rem'}}>
          {/* Row for Tipo de Nodo */}
          <Flex justify="space-between" align="center" style={{ width: '100%' }}>
            <Text size="sm" color='dimmed'>
              Tipo de Nodo
            </Text>
            <Text size="md">{fix_text(riskData.risk.user_type)}</Text>
          </Flex>

          {/* Row for Frecuencia */}
          <Flex justify="space-between" align="center" style={{ width: '100%' }}>
            <Text size="sm" color='dimmed'>
              Frecuencia
            </Text>
            <Text size="md">{formattedValue(riskData.risk.freq)}%</Text>
          </Flex>

          {/* Row for Nivel de Riesgo */}
          <Flex justify="space-between" align="center" style={{ width: '100%' }}>
            <Text size="sm" color='dimmed' >
              Nivel de Riesgo
            </Text>
            <Text size="md" style={{ color: riskData.risk.risk === 2? 'red' : riskData.risk.risk === 1? 'orange' : 'green' }}>
              {fix_text(riskData.risk.risk_name)}
            </Text>
          </Flex>
        </Stack>
    </>
  );
};