import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

// Step #2, The connector
const connector = new AppSearchAPIConnector({
  searchKey: "search-p2m3wx3hzwrhpo3fnvqw41m9",
  engineName: "video-games",
  endpointBase: "https://video-games.ent.ap-south-1.aws.elastic-cloud.com",
});
// Step #3: Configuration options
const configurationOptions = {
  apiConnector: connector,
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // Which fields to search for suggestions
          fields: ["name"],
        },
      },
      // How many suggestions appear
      size: 5,
    },
  },
  searchQuery: {
    search_fields: {
      // 1. Search by name of video game.
      name: {},
    },
    // 2. Results: name, genre, publisher, scores, and platform.
    result_fields: {
      name: {
        // A snippet means that matching search terms will be wrapped in <em> tags.
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true, // Fallback to a "raw" result.
        },
      },
      genre: {
        snippet: {
          size: 50,
          fallback: true,
        },
      },
      publisher: {
        snippet: {
          size: 50,
          fallback: true,
        },
      },
      critic_score: {
        // Scores are numeric, so we won't snippet.
        raw: {},
      },
      user_score: {
        raw: {},
      },
      platform: {
        snippet: {
          size: 50,
          fallback: true,
        },
      },
      image_url: {
        raw: {},
      },
    },
    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
    facets: {
      user_score: {
        type: "range",
        ranges: [
          { from: 0, to: 5, name: "Not good" },
          { from: 5, to: 7, name: "Not bad" },
          { from: 7, to: 9, name: "Pretty good" },
          { from: 9, to: 10, name: "Must play!" },
        ],
      },
      critic_score: {
        type: "range",
        ranges: [
          { from: 0, to: 50, name: "Not good" },
          { from: 50, to: 70, name: "Not bad" },
          { from: 70, to: 90, name: "Pretty good" },
          { from: 90, to: 100, name: "Must play!" },
        ],
      },
      genre: { type: "value", size: 100 },
      publisher: { type: "value", size: 100 },
      platform: { type: "value", size: 100 },
    },
  },
};
// Step #4, SearchProvider: The finishing touches
export default function App() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
        <Layout
          header={<SearchBox autocompleteSuggestions={true} />}
          bodyContent={<Results titleField="name" urlField="image_url" />}
          sideContent={
            <div>
              <Sorting
                label={"Sort by"}
                sortOptions={[
                  {
                    name: "Relevance",
                    value: "",
                    direction: "",
                  },
                  {
                    name: "Name",
                    value: "name",
                    direction: "asc",
                  },
                ]}
              />
              <Facet field="user_score" label="User Score" />
              <Facet field="critic_score" label="Critic Score" />
              <Facet field="genre" label="Genre" />
              <Facet field="publisher" label="Publisher" isFilterable={true} />
              <Facet field="platform" label="Platform" />
            </div>
          }
          bodyHeader={
            <>
              <PagingInfo />
              <ResultsPerPage />
            </>
          }
          bodyFooter={<Paging />}
        />
      </div>
    </SearchProvider>
  );
}
// BVdrT9YWJeQ8zvjKyD7SUgv0
/** https://video-games.es.ap-south-1.aws.elastic-cloud.com
 * elasticsearchendpoint : https://a63b4ccc15e1482786206d8e007e7f82.ap-south-1.aws.elastic-cloud.com:443
 * cloud id video-games:YXAtc291dGgtMS5hd3MuZWxhc3RpYy1jbG91ZC5jb20kYTYzYjRjY2MxNWUxNDgyNzg2MjA2ZDhlMDA3ZTdmODIkZjg0MGMxMTg3MWMxNDMwNmE2OTUxYTgxZWE4MWIyYmQ=
{
  "name": "instance-0000000000",
  "cluster_name": "a63b4ccc15e1482786206d8e007e7f82",
  "cluster_uuid": "MZ9NSgR0SkiOAV1j5mBaRw",
  "version": {
    "number": "8.13.2",
    "build_flavor": "default",
    "build_type": "docker",
    "build_hash": "16cc90cd2d08a3147ce02b07e50894bc060a4cbf",
    "build_date": "2024-04-05T14:45:26.420424304Z",
    "build_snapshot": false,
    "lucene_version": "9.10.0",
    "minimum_wire_compatibility_version": "7.17.0",
    "minimum_index_compatibility_version": "7.0.0"
  },
  "tagline": "You Know, for Search"
}
 */
