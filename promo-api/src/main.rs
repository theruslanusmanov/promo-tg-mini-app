mod schema;

use axum::routing::get;
use axum::Router;
use std::env;
use deadpool_diesel::Pool;
use deadpool_diesel::postgres::{Manager, Object};
use diesel::{Connection, PgConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use dotenvy::dotenv;

// this embeds the migrations into the application binary
// the migration path is relative to the `CARGO_MANIFEST_DIR`
pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations/");

#[tokio::main]
async fn main() {
     dotenv().ok();
     let db_url: String = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

     establish_db_connection(db_url.clone());
     let pool: Pool<Manager, Object> = setup_connection_pool(db_url.clone());

     // run the migrations on server startup
     {
          let conn = pool.get().await.unwrap();
          conn.interact(|conn| conn.run_pending_migrations(MIGRATIONS).map(|_| ()))
              .await
              .unwrap()
              .unwrap();
     }

     // build our application with a route
     let app = Router::new()
         // `GET /` goes to `root`
         .route("/", get(root))
         .with_state(pool);

     // run our app with hyper, listening globally on port 3000
     let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
     axum::serve(listener, app).await.unwrap();
}

pub fn establish_db_connection(db_url: String) -> PgConnection {
     PgConnection::establish(&db_url)
         .unwrap_or_else(|_| panic!("Error connecting to {}", db_url))
}

pub fn setup_connection_pool(db_url: String) -> Pool<Manager, deadpool_diesel::postgres::Object> {
     let manager = deadpool_diesel::postgres::Manager::new(db_url, deadpool_diesel::Runtime::Tokio1);

     Pool::builder(manager)
         .build()
         .unwrap()
}

// basic handler that responds with a static string
async fn root() -> &'static str {
     "Hello, World!"
}