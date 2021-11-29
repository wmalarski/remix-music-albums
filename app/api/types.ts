import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "album" */
export type Album = {
  artist: Scalars['Int'];
  /** An object relationship */
  artistByArtist: Artist;
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregate relationship */
  reviews_aggregate: ReviewAggregate;
  sid: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  visits: Array<Visit>;
  /** An aggregate relationship */
  visits_aggregate: VisitAggregate;
  year: Scalars['Int'];
};


/** columns and relationships of "album" */
export type AlbumReviewsArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


/** columns and relationships of "album" */
export type AlbumReviewsAggregateArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


/** columns and relationships of "album" */
export type AlbumVisitsArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};


/** columns and relationships of "album" */
export type AlbumVisitsAggregateArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};

/** aggregated selection of "album" */
export type AlbumAggregate = {
  aggregate?: Maybe<AlbumAggregateFields>;
  nodes: Array<Album>;
};

/** aggregate fields of "album" */
export type AlbumAggregateFields = {
  avg?: Maybe<AlbumAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<AlbumMaxFields>;
  min?: Maybe<AlbumMinFields>;
  stddev?: Maybe<AlbumStddevFields>;
  stddev_pop?: Maybe<AlbumStddevPopFields>;
  stddev_samp?: Maybe<AlbumStddevSampFields>;
  sum?: Maybe<AlbumSumFields>;
  var_pop?: Maybe<AlbumVarPopFields>;
  var_samp?: Maybe<AlbumVarSampFields>;
  variance?: Maybe<AlbumVarianceFields>;
};


/** aggregate fields of "album" */
export type AlbumAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AlbumSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "album" */
export type AlbumAggregateOrderBy = {
  avg?: InputMaybe<AlbumAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<AlbumMaxOrderBy>;
  min?: InputMaybe<AlbumMinOrderBy>;
  stddev?: InputMaybe<AlbumStddevOrderBy>;
  stddev_pop?: InputMaybe<AlbumStddevPopOrderBy>;
  stddev_samp?: InputMaybe<AlbumStddevSampOrderBy>;
  sum?: InputMaybe<AlbumSumOrderBy>;
  var_pop?: InputMaybe<AlbumVarPopOrderBy>;
  var_samp?: InputMaybe<AlbumVarSampOrderBy>;
  variance?: InputMaybe<AlbumVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "album" */
export type AlbumArrRelInsertInput = {
  data: Array<AlbumInsertInput>;
  /** on conflict condition */
  on_conflict?: InputMaybe<AlbumOnConflict>;
};

/** aggregate avg on columns */
export type AlbumAvgFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "album" */
export type AlbumAvgOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "album". All fields are combined with a logical 'AND'. */
export type AlbumBoolExp = {
  _and?: InputMaybe<Array<AlbumBoolExp>>;
  _not?: InputMaybe<AlbumBoolExp>;
  _or?: InputMaybe<Array<AlbumBoolExp>>;
  artist?: InputMaybe<IntComparisonExp>;
  artistByArtist?: InputMaybe<ArtistBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  reviews?: InputMaybe<ReviewBoolExp>;
  sid?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  visits?: InputMaybe<VisitBoolExp>;
  year?: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "album" */
export enum AlbumConstraint {
  /** unique or primary key constraint */
  AlbumPkey = 'album_pkey'
}

/** input type for incrementing numeric columns in table "album" */
export type AlbumIncInput = {
  artist?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "album" */
export type AlbumInsertInput = {
  artist?: InputMaybe<Scalars['Int']>;
  artistByArtist?: InputMaybe<ArtistObjRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<ReviewArrRelInsertInput>;
  sid?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visits?: InputMaybe<VisitArrRelInsertInput>;
  year?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type AlbumMaxFields = {
  artist?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  sid?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "album" */
export type AlbumMaxOrderBy = {
  artist?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  sid?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type AlbumMinFields = {
  artist?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  sid?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "album" */
export type AlbumMinOrderBy = {
  artist?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  sid?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "album" */
export type AlbumMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Album>;
};

/** input type for inserting object relation for remote table "album" */
export type AlbumObjRelInsertInput = {
  data: AlbumInsertInput;
  /** on conflict condition */
  on_conflict?: InputMaybe<AlbumOnConflict>;
};

/** on conflict condition type for table "album" */
export type AlbumOnConflict = {
  constraint: AlbumConstraint;
  update_columns?: Array<AlbumUpdateColumn>;
  where?: InputMaybe<AlbumBoolExp>;
};

/** Ordering options when selecting data from "album". */
export type AlbumOrderBy = {
  artist?: InputMaybe<OrderBy>;
  artistByArtist?: InputMaybe<ArtistOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  reviews_aggregate?: InputMaybe<ReviewAggregateOrderBy>;
  sid?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  visits_aggregate?: InputMaybe<VisitAggregateOrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: album */
export type AlbumPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "album" */
export enum AlbumSelectColumn {
  /** column name */
  Artist = 'artist',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Sid = 'sid',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

/** input type for updating data in table "album" */
export type AlbumSetInput = {
  artist?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  sid?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type AlbumStddevFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "album" */
export type AlbumStddevOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type AlbumStddevPopFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "album" */
export type AlbumStddevPopOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type AlbumStddevSampFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "album" */
export type AlbumStddevSampOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type AlbumSumFields = {
  artist?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "album" */
export type AlbumSumOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** update columns of table "album" */
export enum AlbumUpdateColumn {
  /** column name */
  Artist = 'artist',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Sid = 'sid',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Year = 'year'
}

/** aggregate var_pop on columns */
export type AlbumVarPopFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "album" */
export type AlbumVarPopOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type AlbumVarSampFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "album" */
export type AlbumVarSampOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type AlbumVarianceFields = {
  artist?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "album" */
export type AlbumVarianceOrderBy = {
  artist?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  year?: InputMaybe<OrderBy>;
};

/** columns and relationships of "artist" */
export type Artist = {
  /** An array relationship */
  albums: Array<Album>;
  /** An aggregate relationship */
  albums_aggregate: AlbumAggregate;
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  name: Scalars['String'];
  sid: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "artist" */
export type ArtistAlbumsArgs = {
  distinct_on?: InputMaybe<Array<AlbumSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AlbumOrderBy>>;
  where?: InputMaybe<AlbumBoolExp>;
};


/** columns and relationships of "artist" */
export type ArtistAlbumsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AlbumSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AlbumOrderBy>>;
  where?: InputMaybe<AlbumBoolExp>;
};

/** aggregated selection of "artist" */
export type ArtistAggregate = {
  aggregate?: Maybe<ArtistAggregateFields>;
  nodes: Array<Artist>;
};

/** aggregate fields of "artist" */
export type ArtistAggregateFields = {
  avg?: Maybe<ArtistAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ArtistMaxFields>;
  min?: Maybe<ArtistMinFields>;
  stddev?: Maybe<ArtistStddevFields>;
  stddev_pop?: Maybe<ArtistStddevPopFields>;
  stddev_samp?: Maybe<ArtistStddevSampFields>;
  sum?: Maybe<ArtistSumFields>;
  var_pop?: Maybe<ArtistVarPopFields>;
  var_samp?: Maybe<ArtistVarSampFields>;
  variance?: Maybe<ArtistVarianceFields>;
};


/** aggregate fields of "artist" */
export type ArtistAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ArtistSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type ArtistAvgFields = {
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "artist". All fields are combined with a logical 'AND'. */
export type ArtistBoolExp = {
  _and?: InputMaybe<Array<ArtistBoolExp>>;
  _not?: InputMaybe<ArtistBoolExp>;
  _or?: InputMaybe<Array<ArtistBoolExp>>;
  albums?: InputMaybe<AlbumBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  sid?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "artist" */
export enum ArtistConstraint {
  /** unique or primary key constraint */
  ArtistPkey = 'artist_pkey'
}

/** input type for incrementing numeric columns in table "artist" */
export type ArtistIncInput = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "artist" */
export type ArtistInsertInput = {
  albums?: InputMaybe<AlbumArrRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  sid?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type ArtistMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type ArtistMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "artist" */
export type ArtistMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Artist>;
};

/** input type for inserting object relation for remote table "artist" */
export type ArtistObjRelInsertInput = {
  data: ArtistInsertInput;
  /** on conflict condition */
  on_conflict?: InputMaybe<ArtistOnConflict>;
};

/** on conflict condition type for table "artist" */
export type ArtistOnConflict = {
  constraint: ArtistConstraint;
  update_columns?: Array<ArtistUpdateColumn>;
  where?: InputMaybe<ArtistBoolExp>;
};

/** Ordering options when selecting data from "artist". */
export type ArtistOrderBy = {
  albums_aggregate?: InputMaybe<AlbumAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  sid?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: artist */
export type ArtistPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "artist" */
export enum ArtistSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sid = 'sid',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "artist" */
export type ArtistSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  sid?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type ArtistStddevFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ArtistStddevPopFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ArtistStddevSampFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ArtistSumFields = {
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "artist" */
export enum ArtistUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sid = 'sid',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type ArtistVarPopFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ArtistVarSampFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ArtistVarianceFields = {
  id?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type MutationRoot = {
  /** delete data from the table: "album" */
  delete_album?: Maybe<AlbumMutationResponse>;
  /** delete single row from the table: "album" */
  delete_album_by_pk?: Maybe<Album>;
  /** delete data from the table: "artist" */
  delete_artist?: Maybe<ArtistMutationResponse>;
  /** delete single row from the table: "artist" */
  delete_artist_by_pk?: Maybe<Artist>;
  /** delete data from the table: "profile" */
  delete_profile?: Maybe<ProfileMutationResponse>;
  /** delete single row from the table: "profile" */
  delete_profile_by_pk?: Maybe<Profile>;
  /** delete data from the table: "review" */
  delete_review?: Maybe<ReviewMutationResponse>;
  /** delete single row from the table: "review" */
  delete_review_by_pk?: Maybe<Review>;
  /** delete data from the table: "visit" */
  delete_visit?: Maybe<VisitMutationResponse>;
  /** delete single row from the table: "visit" */
  delete_visit_by_pk?: Maybe<Visit>;
  /** insert data into the table: "album" */
  insert_album?: Maybe<AlbumMutationResponse>;
  /** insert a single row into the table: "album" */
  insert_album_one?: Maybe<Album>;
  /** insert data into the table: "artist" */
  insert_artist?: Maybe<ArtistMutationResponse>;
  /** insert a single row into the table: "artist" */
  insert_artist_one?: Maybe<Artist>;
  /** insert data into the table: "profile" */
  insert_profile?: Maybe<ProfileMutationResponse>;
  /** insert a single row into the table: "profile" */
  insert_profile_one?: Maybe<Profile>;
  /** insert data into the table: "review" */
  insert_review?: Maybe<ReviewMutationResponse>;
  /** insert a single row into the table: "review" */
  insert_review_one?: Maybe<Review>;
  /** insert data into the table: "visit" */
  insert_visit?: Maybe<VisitMutationResponse>;
  /** insert a single row into the table: "visit" */
  insert_visit_one?: Maybe<Visit>;
  /** update data of the table: "album" */
  update_album?: Maybe<AlbumMutationResponse>;
  /** update single row of the table: "album" */
  update_album_by_pk?: Maybe<Album>;
  /** update data of the table: "artist" */
  update_artist?: Maybe<ArtistMutationResponse>;
  /** update single row of the table: "artist" */
  update_artist_by_pk?: Maybe<Artist>;
  /** update data of the table: "profile" */
  update_profile?: Maybe<ProfileMutationResponse>;
  /** update single row of the table: "profile" */
  update_profile_by_pk?: Maybe<Profile>;
  /** update data of the table: "review" */
  update_review?: Maybe<ReviewMutationResponse>;
  /** update single row of the table: "review" */
  update_review_by_pk?: Maybe<Review>;
  /** update data of the table: "visit" */
  update_visit?: Maybe<VisitMutationResponse>;
  /** update single row of the table: "visit" */
  update_visit_by_pk?: Maybe<Visit>;
};


/** mutation root */
export type MutationRootDeleteAlbumArgs = {
  where: AlbumBoolExp;
};


/** mutation root */
export type MutationRootDeleteAlbumByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteArtistArgs = {
  where: ArtistBoolExp;
};


/** mutation root */
export type MutationRootDeleteArtistByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteProfileArgs = {
  where: ProfileBoolExp;
};


/** mutation root */
export type MutationRootDeleteProfileByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteReviewArgs = {
  where: ReviewBoolExp;
};


/** mutation root */
export type MutationRootDeleteReviewByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteVisitArgs = {
  where: VisitBoolExp;
};


/** mutation root */
export type MutationRootDeleteVisitByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootInsertAlbumArgs = {
  objects: Array<AlbumInsertInput>;
  on_conflict?: InputMaybe<AlbumOnConflict>;
};


/** mutation root */
export type MutationRootInsertAlbumOneArgs = {
  object: AlbumInsertInput;
  on_conflict?: InputMaybe<AlbumOnConflict>;
};


/** mutation root */
export type MutationRootInsertArtistArgs = {
  objects: Array<ArtistInsertInput>;
  on_conflict?: InputMaybe<ArtistOnConflict>;
};


/** mutation root */
export type MutationRootInsertArtistOneArgs = {
  object: ArtistInsertInput;
  on_conflict?: InputMaybe<ArtistOnConflict>;
};


/** mutation root */
export type MutationRootInsertProfileArgs = {
  objects: Array<ProfileInsertInput>;
  on_conflict?: InputMaybe<ProfileOnConflict>;
};


/** mutation root */
export type MutationRootInsertProfileOneArgs = {
  object: ProfileInsertInput;
  on_conflict?: InputMaybe<ProfileOnConflict>;
};


/** mutation root */
export type MutationRootInsertReviewArgs = {
  objects: Array<ReviewInsertInput>;
  on_conflict?: InputMaybe<ReviewOnConflict>;
};


/** mutation root */
export type MutationRootInsertReviewOneArgs = {
  object: ReviewInsertInput;
  on_conflict?: InputMaybe<ReviewOnConflict>;
};


/** mutation root */
export type MutationRootInsertVisitArgs = {
  objects: Array<VisitInsertInput>;
  on_conflict?: InputMaybe<VisitOnConflict>;
};


/** mutation root */
export type MutationRootInsertVisitOneArgs = {
  object: VisitInsertInput;
  on_conflict?: InputMaybe<VisitOnConflict>;
};


/** mutation root */
export type MutationRootUpdateAlbumArgs = {
  _inc?: InputMaybe<AlbumIncInput>;
  _set?: InputMaybe<AlbumSetInput>;
  where: AlbumBoolExp;
};


/** mutation root */
export type MutationRootUpdateAlbumByPkArgs = {
  _inc?: InputMaybe<AlbumIncInput>;
  _set?: InputMaybe<AlbumSetInput>;
  pk_columns: AlbumPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateArtistArgs = {
  _inc?: InputMaybe<ArtistIncInput>;
  _set?: InputMaybe<ArtistSetInput>;
  where: ArtistBoolExp;
};


/** mutation root */
export type MutationRootUpdateArtistByPkArgs = {
  _inc?: InputMaybe<ArtistIncInput>;
  _set?: InputMaybe<ArtistSetInput>;
  pk_columns: ArtistPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateProfileArgs = {
  _inc?: InputMaybe<ProfileIncInput>;
  _set?: InputMaybe<ProfileSetInput>;
  where: ProfileBoolExp;
};


/** mutation root */
export type MutationRootUpdateProfileByPkArgs = {
  _inc?: InputMaybe<ProfileIncInput>;
  _set?: InputMaybe<ProfileSetInput>;
  pk_columns: ProfilePkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateReviewArgs = {
  _inc?: InputMaybe<ReviewIncInput>;
  _set?: InputMaybe<ReviewSetInput>;
  where: ReviewBoolExp;
};


/** mutation root */
export type MutationRootUpdateReviewByPkArgs = {
  _inc?: InputMaybe<ReviewIncInput>;
  _set?: InputMaybe<ReviewSetInput>;
  pk_columns: ReviewPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateVisitArgs = {
  _inc?: InputMaybe<VisitIncInput>;
  _set?: InputMaybe<VisitSetInput>;
  where: VisitBoolExp;
};


/** mutation root */
export type MutationRootUpdateVisitByPkArgs = {
  _inc?: InputMaybe<VisitIncInput>;
  _set?: InputMaybe<VisitSetInput>;
  pk_columns: VisitPkColumnsInput;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "profile" */
export type Profile = {
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregate relationship */
  reviews_aggregate: ReviewAggregate;
  role?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  userId: Scalars['String'];
  /** An array relationship */
  visits: Array<Visit>;
  /** An aggregate relationship */
  visits_aggregate: VisitAggregate;
};


/** columns and relationships of "profile" */
export type ProfileReviewsArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


/** columns and relationships of "profile" */
export type ProfileReviewsAggregateArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


/** columns and relationships of "profile" */
export type ProfileVisitsArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};


/** columns and relationships of "profile" */
export type ProfileVisitsAggregateArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};

/** aggregated selection of "profile" */
export type ProfileAggregate = {
  aggregate?: Maybe<ProfileAggregateFields>;
  nodes: Array<Profile>;
};

/** aggregate fields of "profile" */
export type ProfileAggregateFields = {
  avg?: Maybe<ProfileAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ProfileMaxFields>;
  min?: Maybe<ProfileMinFields>;
  stddev?: Maybe<ProfileStddevFields>;
  stddev_pop?: Maybe<ProfileStddevPopFields>;
  stddev_samp?: Maybe<ProfileStddevSampFields>;
  sum?: Maybe<ProfileSumFields>;
  var_pop?: Maybe<ProfileVarPopFields>;
  var_samp?: Maybe<ProfileVarSampFields>;
  variance?: Maybe<ProfileVarianceFields>;
};


/** aggregate fields of "profile" */
export type ProfileAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ProfileSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type ProfileAvgFields = {
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "profile". All fields are combined with a logical 'AND'. */
export type ProfileBoolExp = {
  _and?: InputMaybe<Array<ProfileBoolExp>>;
  _not?: InputMaybe<ProfileBoolExp>;
  _or?: InputMaybe<Array<ProfileBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  reviews?: InputMaybe<ReviewBoolExp>;
  role?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  userId?: InputMaybe<StringComparisonExp>;
  visits?: InputMaybe<VisitBoolExp>;
};

/** unique or primary key constraints on table "profile" */
export enum ProfileConstraint {
  /** unique or primary key constraint */
  ProfilePkey = 'profile_pkey',
  /** unique or primary key constraint */
  ProfileUserIdKey = 'profile_user_id_key'
}

/** input type for incrementing numeric columns in table "profile" */
export type ProfileIncInput = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "profile" */
export type ProfileInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<ReviewArrRelInsertInput>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['String']>;
  visits?: InputMaybe<VisitArrRelInsertInput>;
};

/** aggregate max on columns */
export type ProfileMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type ProfileMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "profile" */
export type ProfileMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Profile>;
};

/** input type for inserting object relation for remote table "profile" */
export type ProfileObjRelInsertInput = {
  data: ProfileInsertInput;
  /** on conflict condition */
  on_conflict?: InputMaybe<ProfileOnConflict>;
};

/** on conflict condition type for table "profile" */
export type ProfileOnConflict = {
  constraint: ProfileConstraint;
  update_columns?: Array<ProfileUpdateColumn>;
  where?: InputMaybe<ProfileBoolExp>;
};

/** Ordering options when selecting data from "profile". */
export type ProfileOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  reviews_aggregate?: InputMaybe<ReviewAggregateOrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
  visits_aggregate?: InputMaybe<VisitAggregateOrderBy>;
};

/** primary key columns input for table: profile */
export type ProfilePkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "profile" */
export enum ProfileSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "profile" */
export type ProfileSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type ProfileStddevFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProfileStddevPopFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProfileStddevSampFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProfileSumFields = {
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "profile" */
export enum ProfileUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type ProfileVarPopFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProfileVarSampFields = {
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProfileVarianceFields = {
  id?: Maybe<Scalars['Float']>;
};

export type QueryRoot = {
  /** fetch data from the table: "album" */
  album: Array<Album>;
  /** fetch aggregated fields from the table: "album" */
  album_aggregate: AlbumAggregate;
  /** fetch data from the table: "album" using primary key columns */
  album_by_pk?: Maybe<Album>;
  /** fetch data from the table: "artist" */
  artist: Array<Artist>;
  /** fetch aggregated fields from the table: "artist" */
  artist_aggregate: ArtistAggregate;
  /** fetch data from the table: "artist" using primary key columns */
  artist_by_pk?: Maybe<Artist>;
  /** fetch data from the table: "profile" */
  profile: Array<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  profile_aggregate: ProfileAggregate;
  /** fetch data from the table: "profile" using primary key columns */
  profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "review" */
  review: Array<Review>;
  /** fetch aggregated fields from the table: "review" */
  review_aggregate: ReviewAggregate;
  /** fetch data from the table: "review" using primary key columns */
  review_by_pk?: Maybe<Review>;
  /** fetch data from the table: "visit" */
  visit: Array<Visit>;
  /** fetch aggregated fields from the table: "visit" */
  visit_aggregate: VisitAggregate;
  /** fetch data from the table: "visit" using primary key columns */
  visit_by_pk?: Maybe<Visit>;
};


export type QueryRootAlbumArgs = {
  distinct_on?: InputMaybe<Array<AlbumSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AlbumOrderBy>>;
  where?: InputMaybe<AlbumBoolExp>;
};


export type QueryRootAlbumAggregateArgs = {
  distinct_on?: InputMaybe<Array<AlbumSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AlbumOrderBy>>;
  where?: InputMaybe<AlbumBoolExp>;
};


export type QueryRootAlbumByPkArgs = {
  id: Scalars['Int'];
};


export type QueryRootArtistArgs = {
  distinct_on?: InputMaybe<Array<ArtistSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ArtistOrderBy>>;
  where?: InputMaybe<ArtistBoolExp>;
};


export type QueryRootArtistAggregateArgs = {
  distinct_on?: InputMaybe<Array<ArtistSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ArtistOrderBy>>;
  where?: InputMaybe<ArtistBoolExp>;
};


export type QueryRootArtistByPkArgs = {
  id: Scalars['Int'];
};


export type QueryRootProfileArgs = {
  distinct_on?: InputMaybe<Array<ProfileSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileOrderBy>>;
  where?: InputMaybe<ProfileBoolExp>;
};


export type QueryRootProfileAggregateArgs = {
  distinct_on?: InputMaybe<Array<ProfileSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileOrderBy>>;
  where?: InputMaybe<ProfileBoolExp>;
};


export type QueryRootProfileByPkArgs = {
  id: Scalars['Int'];
};


export type QueryRootReviewArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


export type QueryRootReviewAggregateArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


export type QueryRootReviewByPkArgs = {
  id: Scalars['Int'];
};


export type QueryRootVisitArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};


export type QueryRootVisitAggregateArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};


export type QueryRootVisitByPkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "review" */
export type Review = {
  album: Scalars['Int'];
  /** An object relationship */
  albumByAlbum: Album;
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  profile: Scalars['Int'];
  /** An object relationship */
  profileByProfile: Profile;
  rate: Scalars['numeric'];
  text: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "review" */
export type ReviewAggregate = {
  aggregate?: Maybe<ReviewAggregateFields>;
  nodes: Array<Review>;
};

/** aggregate fields of "review" */
export type ReviewAggregateFields = {
  avg?: Maybe<ReviewAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ReviewMaxFields>;
  min?: Maybe<ReviewMinFields>;
  stddev?: Maybe<ReviewStddevFields>;
  stddev_pop?: Maybe<ReviewStddevPopFields>;
  stddev_samp?: Maybe<ReviewStddevSampFields>;
  sum?: Maybe<ReviewSumFields>;
  var_pop?: Maybe<ReviewVarPopFields>;
  var_samp?: Maybe<ReviewVarSampFields>;
  variance?: Maybe<ReviewVarianceFields>;
};


/** aggregate fields of "review" */
export type ReviewAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ReviewSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "review" */
export type ReviewAggregateOrderBy = {
  avg?: InputMaybe<ReviewAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ReviewMaxOrderBy>;
  min?: InputMaybe<ReviewMinOrderBy>;
  stddev?: InputMaybe<ReviewStddevOrderBy>;
  stddev_pop?: InputMaybe<ReviewStddevPopOrderBy>;
  stddev_samp?: InputMaybe<ReviewStddevSampOrderBy>;
  sum?: InputMaybe<ReviewSumOrderBy>;
  var_pop?: InputMaybe<ReviewVarPopOrderBy>;
  var_samp?: InputMaybe<ReviewVarSampOrderBy>;
  variance?: InputMaybe<ReviewVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "review" */
export type ReviewArrRelInsertInput = {
  data: Array<ReviewInsertInput>;
  /** on conflict condition */
  on_conflict?: InputMaybe<ReviewOnConflict>;
};

/** aggregate avg on columns */
export type ReviewAvgFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "review" */
export type ReviewAvgOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "review". All fields are combined with a logical 'AND'. */
export type ReviewBoolExp = {
  _and?: InputMaybe<Array<ReviewBoolExp>>;
  _not?: InputMaybe<ReviewBoolExp>;
  _or?: InputMaybe<Array<ReviewBoolExp>>;
  album?: InputMaybe<IntComparisonExp>;
  albumByAlbum?: InputMaybe<AlbumBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  profile?: InputMaybe<IntComparisonExp>;
  profileByProfile?: InputMaybe<ProfileBoolExp>;
  rate?: InputMaybe<NumericComparisonExp>;
  text?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "review" */
export enum ReviewConstraint {
  /** unique or primary key constraint */
  ReviewPkey = 'review_pkey'
}

/** input type for incrementing numeric columns in table "review" */
export type ReviewIncInput = {
  album?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<Scalars['Int']>;
  rate?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "review" */
export type ReviewInsertInput = {
  album?: InputMaybe<Scalars['Int']>;
  albumByAlbum?: InputMaybe<AlbumObjRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<Scalars['Int']>;
  profileByProfile?: InputMaybe<ProfileObjRelInsertInput>;
  rate?: InputMaybe<Scalars['numeric']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type ReviewMaxFields = {
  album?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  profile?: Maybe<Scalars['Int']>;
  rate?: Maybe<Scalars['numeric']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "review" */
export type ReviewMaxOrderBy = {
  album?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
  text?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ReviewMinFields = {
  album?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  profile?: Maybe<Scalars['Int']>;
  rate?: Maybe<Scalars['numeric']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "review" */
export type ReviewMinOrderBy = {
  album?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
  text?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "review" */
export type ReviewMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Review>;
};

/** on conflict condition type for table "review" */
export type ReviewOnConflict = {
  constraint: ReviewConstraint;
  update_columns?: Array<ReviewUpdateColumn>;
  where?: InputMaybe<ReviewBoolExp>;
};

/** Ordering options when selecting data from "review". */
export type ReviewOrderBy = {
  album?: InputMaybe<OrderBy>;
  albumByAlbum?: InputMaybe<AlbumOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  profileByProfile?: InputMaybe<ProfileOrderBy>;
  rate?: InputMaybe<OrderBy>;
  text?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: review */
export type ReviewPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "review" */
export enum ReviewSelectColumn {
  /** column name */
  Album = 'album',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Profile = 'profile',
  /** column name */
  Rate = 'rate',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "review" */
export type ReviewSetInput = {
  album?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<Scalars['Int']>;
  rate?: InputMaybe<Scalars['numeric']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type ReviewStddevFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "review" */
export type ReviewStddevOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ReviewStddevPopFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "review" */
export type ReviewStddevPopOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ReviewStddevSampFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "review" */
export type ReviewStddevSampOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type ReviewSumFields = {
  album?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  profile?: Maybe<Scalars['Int']>;
  rate?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "review" */
export type ReviewSumOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** update columns of table "review" */
export enum ReviewUpdateColumn {
  /** column name */
  Album = 'album',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Profile = 'profile',
  /** column name */
  Rate = 'rate',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type ReviewVarPopFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "review" */
export type ReviewVarPopOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ReviewVarSampFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "review" */
export type ReviewVarSampOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type ReviewVarianceFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "review" */
export type ReviewVarianceOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  rate?: InputMaybe<OrderBy>;
};

export type SubscriptionRoot = {
  /** fetch data from the table: "album" */
  album: Array<Album>;
  /** fetch aggregated fields from the table: "album" */
  album_aggregate: AlbumAggregate;
  /** fetch data from the table: "album" using primary key columns */
  album_by_pk?: Maybe<Album>;
  /** fetch data from the table: "artist" */
  artist: Array<Artist>;
  /** fetch aggregated fields from the table: "artist" */
  artist_aggregate: ArtistAggregate;
  /** fetch data from the table: "artist" using primary key columns */
  artist_by_pk?: Maybe<Artist>;
  /** fetch data from the table: "profile" */
  profile: Array<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  profile_aggregate: ProfileAggregate;
  /** fetch data from the table: "profile" using primary key columns */
  profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "review" */
  review: Array<Review>;
  /** fetch aggregated fields from the table: "review" */
  review_aggregate: ReviewAggregate;
  /** fetch data from the table: "review" using primary key columns */
  review_by_pk?: Maybe<Review>;
  /** fetch data from the table: "visit" */
  visit: Array<Visit>;
  /** fetch aggregated fields from the table: "visit" */
  visit_aggregate: VisitAggregate;
  /** fetch data from the table: "visit" using primary key columns */
  visit_by_pk?: Maybe<Visit>;
};


export type SubscriptionRootAlbumArgs = {
  distinct_on?: InputMaybe<Array<AlbumSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AlbumOrderBy>>;
  where?: InputMaybe<AlbumBoolExp>;
};


export type SubscriptionRootAlbumAggregateArgs = {
  distinct_on?: InputMaybe<Array<AlbumSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AlbumOrderBy>>;
  where?: InputMaybe<AlbumBoolExp>;
};


export type SubscriptionRootAlbumByPkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionRootArtistArgs = {
  distinct_on?: InputMaybe<Array<ArtistSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ArtistOrderBy>>;
  where?: InputMaybe<ArtistBoolExp>;
};


export type SubscriptionRootArtistAggregateArgs = {
  distinct_on?: InputMaybe<Array<ArtistSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ArtistOrderBy>>;
  where?: InputMaybe<ArtistBoolExp>;
};


export type SubscriptionRootArtistByPkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionRootProfileArgs = {
  distinct_on?: InputMaybe<Array<ProfileSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileOrderBy>>;
  where?: InputMaybe<ProfileBoolExp>;
};


export type SubscriptionRootProfileAggregateArgs = {
  distinct_on?: InputMaybe<Array<ProfileSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProfileOrderBy>>;
  where?: InputMaybe<ProfileBoolExp>;
};


export type SubscriptionRootProfileByPkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionRootReviewArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


export type SubscriptionRootReviewAggregateArgs = {
  distinct_on?: InputMaybe<Array<ReviewSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ReviewOrderBy>>;
  where?: InputMaybe<ReviewBoolExp>;
};


export type SubscriptionRootReviewByPkArgs = {
  id: Scalars['Int'];
};


export type SubscriptionRootVisitArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};


export type SubscriptionRootVisitAggregateArgs = {
  distinct_on?: InputMaybe<Array<VisitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VisitOrderBy>>;
  where?: InputMaybe<VisitBoolExp>;
};


export type SubscriptionRootVisitByPkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "visit" */
export type Visit = {
  album: Scalars['Int'];
  /** An object relationship */
  albumByAlbum: Album;
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  profile: Scalars['Int'];
  /** An object relationship */
  profileByProfile: Profile;
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "visit" */
export type VisitAggregate = {
  aggregate?: Maybe<VisitAggregateFields>;
  nodes: Array<Visit>;
};

/** aggregate fields of "visit" */
export type VisitAggregateFields = {
  avg?: Maybe<VisitAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<VisitMaxFields>;
  min?: Maybe<VisitMinFields>;
  stddev?: Maybe<VisitStddevFields>;
  stddev_pop?: Maybe<VisitStddevPopFields>;
  stddev_samp?: Maybe<VisitStddevSampFields>;
  sum?: Maybe<VisitSumFields>;
  var_pop?: Maybe<VisitVarPopFields>;
  var_samp?: Maybe<VisitVarSampFields>;
  variance?: Maybe<VisitVarianceFields>;
};


/** aggregate fields of "visit" */
export type VisitAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<VisitSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "visit" */
export type VisitAggregateOrderBy = {
  avg?: InputMaybe<VisitAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<VisitMaxOrderBy>;
  min?: InputMaybe<VisitMinOrderBy>;
  stddev?: InputMaybe<VisitStddevOrderBy>;
  stddev_pop?: InputMaybe<VisitStddevPopOrderBy>;
  stddev_samp?: InputMaybe<VisitStddevSampOrderBy>;
  sum?: InputMaybe<VisitSumOrderBy>;
  var_pop?: InputMaybe<VisitVarPopOrderBy>;
  var_samp?: InputMaybe<VisitVarSampOrderBy>;
  variance?: InputMaybe<VisitVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "visit" */
export type VisitArrRelInsertInput = {
  data: Array<VisitInsertInput>;
  /** on conflict condition */
  on_conflict?: InputMaybe<VisitOnConflict>;
};

/** aggregate avg on columns */
export type VisitAvgFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "visit" */
export type VisitAvgOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "visit". All fields are combined with a logical 'AND'. */
export type VisitBoolExp = {
  _and?: InputMaybe<Array<VisitBoolExp>>;
  _not?: InputMaybe<VisitBoolExp>;
  _or?: InputMaybe<Array<VisitBoolExp>>;
  album?: InputMaybe<IntComparisonExp>;
  albumByAlbum?: InputMaybe<AlbumBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  profile?: InputMaybe<IntComparisonExp>;
  profileByProfile?: InputMaybe<ProfileBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "visit" */
export enum VisitConstraint {
  /** unique or primary key constraint */
  UniqueAlbumProfile = 'unique_album_profile',
  /** unique or primary key constraint */
  VisitPkey = 'visit_pkey'
}

/** input type for incrementing numeric columns in table "visit" */
export type VisitIncInput = {
  album?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "visit" */
export type VisitInsertInput = {
  album?: InputMaybe<Scalars['Int']>;
  albumByAlbum?: InputMaybe<AlbumObjRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<Scalars['Int']>;
  profileByProfile?: InputMaybe<ProfileObjRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type VisitMaxFields = {
  album?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  profile?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "visit" */
export type VisitMaxOrderBy = {
  album?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type VisitMinFields = {
  album?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  profile?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "visit" */
export type VisitMinOrderBy = {
  album?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "visit" */
export type VisitMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Visit>;
};

/** on conflict condition type for table "visit" */
export type VisitOnConflict = {
  constraint: VisitConstraint;
  update_columns?: Array<VisitUpdateColumn>;
  where?: InputMaybe<VisitBoolExp>;
};

/** Ordering options when selecting data from "visit". */
export type VisitOrderBy = {
  album?: InputMaybe<OrderBy>;
  albumByAlbum?: InputMaybe<AlbumOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
  profileByProfile?: InputMaybe<ProfileOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: visit */
export type VisitPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "visit" */
export enum VisitSelectColumn {
  /** column name */
  Album = 'album',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Profile = 'profile',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "visit" */
export type VisitSetInput = {
  album?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type VisitStddevFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "visit" */
export type VisitStddevOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type VisitStddevPopFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "visit" */
export type VisitStddevPopOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type VisitStddevSampFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "visit" */
export type VisitStddevSampOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type VisitSumFields = {
  album?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  profile?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "visit" */
export type VisitSumOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** update columns of table "visit" */
export enum VisitUpdateColumn {
  /** column name */
  Album = 'album',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Profile = 'profile',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type VisitVarPopFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "visit" */
export type VisitVarPopOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type VisitVarSampFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "visit" */
export type VisitVarSampOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type VisitVarianceFields = {
  album?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  profile?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "visit" */
export type VisitVarianceOrderBy = {
  album?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profile?: InputMaybe<OrderBy>;
};

export type AlbumFragment = { id: number, sid: string, title: string, year: number };

export type AlbumWithArtistFragment = { id: number, sid: string, title: string, year: number, artistByArtist: { id: number, sid: string, name: string } };

export type AlbumWithArtistAndReviewsFragment = { id: number, sid: string, title: string, year: number, reviews: Array<{ id: number, rate: any, text: string, createdAt: any }>, artistByArtist: { id: number, sid: string, name: string } };

export type SelectAlbumsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SelectAlbumsQuery = { album: Array<{ id: number, sid: string, title: string, year: number, artistByArtist: { id: number, sid: string, name: string } }> };

export type InsertAlbumMutationVariables = Exact<{
  album: AlbumInsertInput;
}>;


export type InsertAlbumMutation = { insert_album_one?: { id: number } | null | undefined };

export type SelectAlbumQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SelectAlbumQuery = { album_by_pk?: { id: number, sid: string, title: string, year: number, reviews: Array<{ id: number, rate: any, text: string, createdAt: any }>, artistByArtist: { id: number, sid: string, name: string } } | null | undefined };

export type DeleteAlbumMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAlbumMutation = { delete_album_by_pk?: { artist: number } | null | undefined };

export type UpdateAlbumMutationVariables = Exact<{
  id: Scalars['Int'];
  input?: InputMaybe<AlbumSetInput>;
}>;


export type UpdateAlbumMutation = { update_album_by_pk?: { id: number } | null | undefined };

export type ArtistFragment = { id: number, sid: string, name: string };

export type ArtistWithAlbumsFragment = { id: number, sid: string, name: string, albums: Array<{ id: number, sid: string, title: string, year: number }> };

export type SelectArtistsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SelectArtistsQuery = { artist: Array<{ id: number, sid: string, name: string }> };

export type InsertArtistMutationVariables = Exact<{
  artist: ArtistInsertInput;
}>;


export type InsertArtistMutation = { insert_artist_one?: { id: number } | null | undefined };

export type SelectArtistQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SelectArtistQuery = { artist_by_pk?: { id: number, sid: string, name: string, albums: Array<{ id: number, sid: string, title: string, year: number }> } | null | undefined };

export type DeleteArtistMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteArtistMutation = { delete_artist_by_pk?: { id: number } | null | undefined };

export type UpdateArtistMutationVariables = Exact<{
  id: Scalars['Int'];
  input?: InputMaybe<ArtistSetInput>;
}>;


export type UpdateArtistMutation = { update_artist_by_pk?: { id: number } | null | undefined };

export type ReviewFragment = { id: number, rate: any, text: string, createdAt: any };

export type ReviewWithAlbumAndArtistFragment = { id: number, rate: any, text: string, createdAt: any, albumByAlbum: { id: number, sid: string, title: string, year: number, artistByArtist: { id: number, sid: string, name: string } } };

export type InsertReviewMutationVariables = Exact<{
  review: ReviewInsertInput;
}>;


export type InsertReviewMutation = { insert_review_one?: { id: number } | null | undefined };

export type SelectReviewsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SelectReviewsQuery = { review: Array<{ id: number, rate: any, text: string, createdAt: any, albumByAlbum: { id: number, sid: string, title: string, year: number, artistByArtist: { id: number, sid: string, name: string } } }> };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteReviewMutation = { delete_review_by_pk?: { album: number } | null | undefined };

export type UpdateReviewMutationVariables = Exact<{
  id: Scalars['Int'];
  input?: InputMaybe<ReviewSetInput>;
}>;


export type UpdateReviewMutation = { update_review_by_pk?: { id: number } | null | undefined };

export type VisitFragment = { id: number, createdAt: any };

export type VisitWithAlbumAndArtistFragment = { id: number, createdAt: any, albumByAlbum: { id: number, sid: string, title: string, year: number, artistByArtist: { id: number, sid: string, name: string } } };

export type InsertVisitMutationVariables = Exact<{
  visit: VisitInsertInput;
}>;


export type InsertVisitMutation = { insert_visit_one?: { id: number } | null | undefined };

export type SelectVisitsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SelectVisitsQuery = { visit: Array<{ id: number, createdAt: any, albumByAlbum: { id: number, sid: string, title: string, year: number, artistByArtist: { id: number, sid: string, name: string } } }> };

export const Album = gql`
    fragment Album on album {
  id
  sid
  title
  year
}
    `;
export const Artist = gql`
    fragment Artist on artist {
  id
  sid
  name
}
    `;
export const AlbumWithArtist = gql`
    fragment AlbumWithArtist on album {
  ...Album
  artistByArtist {
    ...Artist
  }
}
    ${Album}
${Artist}`;
export const Review = gql`
    fragment Review on review {
  id
  rate
  text
  createdAt
}
    `;
export const AlbumWithArtistAndReviews = gql`
    fragment AlbumWithArtistAndReviews on album {
  ...AlbumWithArtist
  reviews {
    ...Review
  }
}
    ${AlbumWithArtist}
${Review}`;
export const ArtistWithAlbums = gql`
    fragment ArtistWithAlbums on artist {
  ...Artist
  albums {
    ...Album
  }
}
    ${Artist}
${Album}`;
export const ReviewWithAlbumAndArtist = gql`
    fragment ReviewWithAlbumAndArtist on review {
  ...Review
  albumByAlbum {
    ...AlbumWithArtist
  }
}
    ${Review}
${AlbumWithArtist}`;
export const Visit = gql`
    fragment Visit on visit {
  id
  createdAt
}
    `;
export const VisitWithAlbumAndArtist = gql`
    fragment VisitWithAlbumAndArtist on visit {
  ...Visit
  albumByAlbum {
    ...AlbumWithArtist
  }
}
    ${Visit}
${AlbumWithArtist}`;
export const SelectAlbums = gql`
    query SelectAlbums($limit: Int, $offset: Int) {
  album(limit: $limit, offset: $offset) {
    ...AlbumWithArtist
  }
}
    ${AlbumWithArtist}`;
export const InsertAlbum = gql`
    mutation InsertAlbum($album: album_insert_input!) {
  insert_album_one(object: $album) {
    id
  }
}
    `;
export const SelectAlbum = gql`
    query SelectAlbum($id: Int!) {
  album_by_pk(id: $id) {
    ...AlbumWithArtistAndReviews
  }
}
    ${AlbumWithArtistAndReviews}`;
export const DeleteAlbum = gql`
    mutation DeleteAlbum($id: Int!) {
  delete_album_by_pk(id: $id) {
    artist
  }
}
    `;
export const UpdateAlbum = gql`
    mutation UpdateAlbum($id: Int!, $input: album_set_input) {
  update_album_by_pk(pk_columns: {id: $id}, _set: $input) {
    id
  }
}
    `;
export const SelectArtists = gql`
    query SelectArtists($limit: Int, $offset: Int) {
  artist(limit: $limit, offset: $offset) {
    ...Artist
  }
}
    ${Artist}`;
export const InsertArtist = gql`
    mutation InsertArtist($artist: artist_insert_input!) {
  insert_artist_one(object: $artist) {
    id
  }
}
    `;
export const SelectArtist = gql`
    query SelectArtist($id: Int!) {
  artist_by_pk(id: $id) {
    ...ArtistWithAlbums
  }
}
    ${ArtistWithAlbums}`;
export const DeleteArtist = gql`
    mutation DeleteArtist($id: Int!) {
  delete_artist_by_pk(id: $id) {
    id
  }
}
    `;
export const UpdateArtist = gql`
    mutation UpdateArtist($id: Int!, $input: artist_set_input) {
  update_artist_by_pk(pk_columns: {id: $id}, _set: $input) {
    id
  }
}
    `;
export const InsertReview = gql`
    mutation InsertReview($review: review_insert_input!) {
  insert_review_one(object: $review) {
    id
  }
}
    `;
export const SelectReviews = gql`
    query SelectReviews($limit: Int, $offset: Int) {
  review(limit: $limit, offset: $offset) {
    ...ReviewWithAlbumAndArtist
  }
}
    ${ReviewWithAlbumAndArtist}`;
export const DeleteReview = gql`
    mutation DeleteReview($id: Int!) {
  delete_review_by_pk(id: $id) {
    album
  }
}
    `;
export const UpdateReview = gql`
    mutation UpdateReview($id: Int!, $input: review_set_input) {
  update_review_by_pk(pk_columns: {id: $id}, _set: $input) {
    id
  }
}
    `;
export const InsertVisit = gql`
    mutation InsertVisit($visit: visit_insert_input!) {
  insert_visit_one(
    object: $visit
    on_conflict: {constraint: unique_album_profile, update_columns: [updatedAt, createdAt], where: {createdAt: {_is_null: false}}}
  ) {
    id
  }
}
    `;
export const SelectVisits = gql`
    query SelectVisits($limit: Int, $offset: Int) {
  visit(limit: $limit, offset: $offset) {
    ...VisitWithAlbumAndArtist
  }
}
    ${VisitWithAlbumAndArtist}`;