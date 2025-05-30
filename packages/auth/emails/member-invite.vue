<script setup lang="ts">
  import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text
  } from '@vue-email/components';

  interface MemberInviteProps {
    inviterName?: string;
    organizationName?: string;
    inviteLink?: string;
  }

  withDefaults(defineProps<MemberInviteProps>(), {
    inviterName: '',
    organizationName: '',
    inviteLink: ''
  });

  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  };

  const container = {
    padding: '40px 24px',
    margin: '0 auto',
    maxWidth: '600px'
  };

  const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#333'
  };

  const button = {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#000',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    marginTop: '24px',
    marginBottom: '24px'
  };

  const text = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '24px',
    lineHeight: '24px'
  };

  const footer = {
    fontSize: '14px',
    color: '#898989',
    marginTop: '32px'
  };

  const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <Html>
    <Head />
    <Preview
      >Join {{ organizationName }} on
      {{ runtimeConfig.public.siteName }}</Preview
    >

    <Body :style="main">
      <Container :style="container">
        <Img
          v-if="runtimeConfig.public.LOGO_URL"
          :src="runtimeConfig.public.LOGO_URL"
          width="40"
          alt="Logo"
        />

        <Heading :style="heading">
          {{ inviterName }} invited you to join {{ organizationName }}
        </Heading>

        <Text :style="text">
          {{ organizationName }} is using {{ runtimeConfig.public.siteName }} to
          collaborate. Accept the invitation below to get started.
        </Text>

        <Link :href="inviteLink" target="_blank" :style="button">
          Accept invitation
        </Link>

        <Text :style="footer">
          If you weren't expecting this invitation, you can ignore this email.
          <br />
          <Link
            :href="runtimeConfig.public.siteUrl"
            target="_blank"
            :style="{ color: '#898989', textDecoration: 'underline' }"
          >
            {{ runtimeConfig.public.siteName }}
          </Link>
          {{
            runtimeConfig.public.APP_DESCRIPTION
              ? ` - ${runtimeConfig.public.APP_DESCRIPTION}`
              : ''
          }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>
