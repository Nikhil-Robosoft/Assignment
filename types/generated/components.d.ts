import type { Schema, Struct } from '@strapi/strapi';

export interface BlogPostSelection extends Struct.ComponentSchema {
  collectionName: 'components_blog_post_selections';
  info: {
    displayName: 'postSelection';
  };
  attributes: {
    featuredposts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    heading: Schema.Attribute.String;
  };
}

export interface ConfigSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_config_social_links';
  info: {
    description: '';
    displayName: 'social link';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    socialMedia: Schema.Attribute.Enumeration<
      ['youtube', 'facebook', 'twitter']
    > &
      Schema.Attribute.Required;
  };
}

export interface LayoutFeaturedCourse extends Struct.ComponentSchema {
  collectionName: 'components_layout_featured_courses';
  info: {
    description: '';
    displayName: 'featured course';
  };
  attributes: {
    announcement: Schema.Attribute.Text & Schema.Attribute.Required;
    course: Schema.Attribute.Relation<'oneToOne', 'api::course.course'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'hero section';
    icon: 'archive';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'layout.link', true>;
    callToAction: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images', true>;
  };
}

export interface LayoutLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_links';
  info: {
    description: '';
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutMission extends Struct.ComponentSchema {
  collectionName: 'components_layout_missions';
  info: {
    displayName: 'mission';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'mission'>;
    show: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface LayoutNewsLetter extends Struct.ComponentSchema {
  collectionName: 'components_layout_news_letters';
  info: {
    displayName: 'newsLetter';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subHeading: Schema.Attribute.Text;
  };
}

export interface LayoutPageInfo extends Struct.ComponentSchema {
  collectionName: 'components_layout_page_infos';
  info: {
    displayName: 'pageInfo';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    cover: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    seo: Schema.Attribute.Component<'seo.seoinformation', false>;
  };
}

export interface LayoutServicesPreview extends Struct.ComponentSchema {
  collectionName: 'components_layout_services_previews';
  info: {
    displayName: 'services preview';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface SeoSeoinformation extends Struct.ComponentSchema {
  collectionName: 'components_seo_seoinformations';
  info: {
    displayName: 'seoinformation';
    icon: 'search';
  };
  attributes: {
    seodescription: Schema.Attribute.Blocks;
    seotitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.post-selection': BlogPostSelection;
      'config.social-link': ConfigSocialLink;
      'layout.featured-course': LayoutFeaturedCourse;
      'layout.hero-section': LayoutHeroSection;
      'layout.link': LayoutLink;
      'layout.mission': LayoutMission;
      'layout.news-letter': LayoutNewsLetter;
      'layout.page-info': LayoutPageInfo;
      'layout.services-preview': LayoutServicesPreview;
      'seo.seoinformation': SeoSeoinformation;
    }
  }
}
