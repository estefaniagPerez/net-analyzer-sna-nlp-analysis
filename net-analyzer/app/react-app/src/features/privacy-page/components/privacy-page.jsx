import React from 'react';
import { Container, Title, Text, Divider, Anchor, Stack, Space, List } from '@mantine/core';
import privacyLegalContent from '../assets/sections.json';

export const PrivacyPage = () => {
  const { title, intro, sections, contact } = privacyLegalContent;

  return (
    <Container size="md" my="xl">
      <Title order={1} align="left" mb="md">
        {title}
      </Title>

      <Text size="md" align="left" mb="lg">
        {intro}
      </Text>

      <Divider />
      <Space h="xl" />

      <Stack spacing="lg">
        {sections.map((section, index) => (
          <div key={index}>
            <Title order={2} align="left" mb="sm">
              {section.heading}
            </Title>
            {section.subsections ? (
              section.subsections.map((subsection, subIndex) => (
                <div key={subIndex} style={{ marginBottom: '1rem' }}>
                  <Title order={3} align="left" mb="sm">
                    {subsection.subheading}
                  </Title>
                  <div style={{ textAlign: 'left', width: '100%' }}>
                    <List
                      spacing="xs"
                      size="sm"
                      listStyleType="disc"
                      withPadding
                    >
                      {subsection.libraries.map((lib, libIndex) => (
                        <List.Item key={libIndex}>{lib}</List.Item>
                      ))}
                    </List>
                  </div>
                </div>
              ))
            ) : (
              <Text size="md" align="justify">
                {section.content}
              </Text>
            )}
          </div>
        ))}
      </Stack>

      <Divider />
      <Space h="xl" />
    </Container>
  );
};
