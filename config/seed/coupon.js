module.exports = [
  {
    "code": "FIXED10",
    "discounts": [
      {
        "discount_type": "FIXED",
        "discount_amount": 10,
      }
    ],
    "rules": [
      {
        "rule_type": "PRICE",
        "rule_value": 50
      },
      {
        "rule_type": "ITEM",
        "rule_value": 1
      }
    ]
  },
  {
    "code": "PERCENT10",
    "discounts": [
      {
        "discount_type": "PERCENT",
        "discount_amount": 10,
      }
    ],
    "rules": [
      {
        "rule_type": "PRICE",
        "rule_value": 100
      },
      {
        "rule_type": "ITEM",
        "rule_value": 2
      }
    ]
  },
  {
    "code": "MIXED10",
    "discounts": [
      {
        "discount_type": "MIXED",
        "discount_amount": 10,
      }
    ],
    "rules": [
      {
        "rule_type": "PRICE",
        "rule_value": 200
      },
      {
        "rule_type": "ITEM",
        "rule_value": 3
      }
    ]
  },
  {
    "code": "REJECTED10",
    "discounts": [
      {
        "discount_type": "PERCENT",
        "discount_amount": 10,
      },
      {
        "discount_type": "FIXED",
        "discount_amount": 10,
      }
    ],
    "rules": [
      {
        "rule_type": "PRICE",
        "rule_value": 1000
      }
    ]
  }
]