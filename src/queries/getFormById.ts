export const getFormById = `query GetFormById($id: ID!) {
    form(id: $id) {
      data {
        id
        attributes {
          name
          formFields {
            data {
              id
              attributes {
                name
                label
                isRequired
                formFieldType {
                  data {
                    id
                    attributes {
                      description
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
