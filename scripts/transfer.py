import json
from collections import defaultdict
from pathlib import Path

import requests


loadUrl = ""
loadDocument = """
query Performers($first: Int, $after: String) {
  performers(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      name
      updatedAt
      createdAt
      albums {
        nodes {
          createdAt
          id
          mBid
          name
          reviews {
            nodes {
              createdAt
              id
              rating
              text
              updatedAt
            }
          }
          updatedAt
          year
        }
      }
    }
  }
}      
"""

insertUrl = ""
insertArtist = """
mutation InsertArtist($artist: [artist_insert_input!]!) {
  insert_artist(objects: $artist) {
    affected_rows
  }
}

"""


def load_data():
    has_next_page = True
    end_cursor = None
    nodes = []
    iteration = 0
    while has_next_page:
        data = {
            "query": loadDocument,
            "variables": {
                "first": 50,
                "after": end_cursor,
            }
        }
        result = requests.post(url=loadUrl, json=data)
        result_json = result.json()

        page_info = result_json["data"]["performers"]["pageInfo"]
        nodes += result_json["data"]["performers"]["nodes"]
        has_next_page = page_info["hasNextPage"]
        end_cursor = page_info['endCursor']
        iteration += 1

        print(f"Collected: {len(nodes)}, Iteration: {iteration}")

    with Path('cache.json').open('w') as file:
        json.dump(nodes, file, indent=2)


def upload_data():
    with Path('cache.json').open('r') as file:
        performers = json.load(file)

    performer_acc = defaultdict(list)
    for index, performer in enumerate(performers):
        performer_acc[index // 50].append(performer)

    for performers_batch in performer_acc.values():
        variables = {
            "artist": [{
                "albums": {
                    "data": [{
                        "createdAt": album["createdAt"],
                        "reviews": {
                            "data": [{
                                "createdAt": review["createdAt"],
                                "profile": 1,
                                "rate": review["rating"],
                                "text": review["text"],
                                "updatedAt": review["updatedAt"],
                            } for review in album["reviews"]["nodes"]]
                        },
                        "sid": album["mBid"],
                        "title": album["name"],
                        "updatedAt": album["updatedAt"],
                        "year": album["year"],
                    } for album in performer["albums"]["nodes"]]
                },
                "createdAt": performer["createdAt"],
                "name": performer["name"],
                "sid": performer.get("mBid"),
                "updatedAt": performer["updatedAt"],
            } for performer in performers_batch]
        }

        data = {
            "query": insertArtist,
            "variables": variables
        }
        result = requests.post(url=insertUrl, json=data, headers={
            "content-type": "application/json",
            "x-hasura-admin-secret": "",
        })
        result_json = result.json()

        print(json.dumps(result_json, indent=2))


def main():
    upload_data()


if __name__ == '__main__':
    main()
